"""The Air Quality Sensors integration."""
from __future__ import annotations

import os
import logging
import time
from datetime import datetime
from typing import Any

import requests
from homeassistant.components.frontend import add_extra_js_url
from homeassistant.config_entries import SOURCE_IMPORT, ConfigEntry
from homeassistant.const import Platform, EVENT_CORE_CONFIG_UPDATE
from homeassistant.core import HomeAssistant, callback, CALLBACK_TYPE, Event
from homeassistant.helpers import event
from homeassistant.helpers.entity import Entity
from homeassistant.helpers.integration_platform import (
    async_process_integration_platform_for_component,
)
from homeassistant.helpers.typing import ConfigType, StateType
from homeassistant.util import dt as dt_util

from .const import (
    DOMAIN,
    NAME,
    DEVICE_MODEL,
    ATTRIBUTION,
    DEVICE_MANUFACTURER,
    UPDATE_INTERVAL,
    ATTR_AIR_QUALITY_INDEX,
    ATTR_AIR_QUALITY_INDEX_INSTANT,
    ATTR_PM_2_5,
    ATTR_PM_10,
    ATTR_TEMPERATURE,
    ATTR_HUMIDITY,
    ATTR_PRESSURE,
    API_URL,
)
from .utils import get_nearest_weather_stations, WeatherStation

LOGGER = logging.getLogger(__name__)


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Track the state of the Airquality sensors."""

    # Register UI lovelace card
    card_file_path = os.path.dirname(os.path.realpath(__file__)) + "/lovelace"
    hass.http.register_static_path("/air-quality-krasnoyarsk", card_file_path, False)
    add_extra_js_url(hass, "/air-quality-krasnoyarsk/air-quality-krasnoyarsk-card.js?cache=" + str(time.time()), es5=False)

    # Async init entry
    hass.async_create_task(
        hass.config_entries.flow.async_init(
            DOMAIN,
            context={"source": SOURCE_IMPORT},
            data=config,
        )
    )
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up from a config entry."""
    await async_process_integration_platform_for_component(hass, DOMAIN)

    hass.data[DOMAIN] = Airquality(hass)
    await hass.config_entries.async_forward_entry_setups(entry, [Platform.SENSOR])
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    unload_ok = await hass.config_entries.async_unload_platforms(entry, [Platform.SENSOR])
    if unload_ok:
        airquality: Airquality = hass.data.pop(DOMAIN)
        airquality.unsubscribe()
        hass.states.async_remove(airquality.entity_id)
    return unload_ok


class Airquality(Entity):
    """Representation of the Airquality."""
    entity_id = f"{DOMAIN}.{DOMAIN}"

    _attr_name = NAME
    _attr_attribution = ATTRIBUTION

    _attr_aqi: StateType = None
    _attr_aqi_instant: StateType = None
    _attr_pm_2_5: StateType = None
    _attr_pm_10: StateType = None
    _attr_temperature: StateType = None
    _attr_humidity: StateType = None
    _attr_pressure: StateType = None

    _home: tuple[float, float] = None
    _weather_stations: list[WeatherStation] = []

    _config_unsubscribe: CALLBACK_TYPE | None = None
    _update_unsubscribe: CALLBACK_TYPE | None = None

    def __init__(self, hass: HomeAssistant) -> None:
        """Initialize the Airquality instance."""
        self.hass = hass

        self._config_unsubscribe = self.hass.bus.async_listen(
            EVENT_CORE_CONFIG_UPDATE,
            self.update_location,
        )
        self.update_location(initial=True)

    @callback
    def update_location(self, _: Event | None = None, initial: bool = False) -> None:
        """Update location."""
        home = (self.hass.config.latitude, self.hass.config.longitude)
        if not initial and self._home == home:
            return

        self._home = home

        if self._update_unsubscribe:
            self._update_unsubscribe()

        self.hass.async_add_executor_job(self.update_weather_stations)

    @callback
    def unsubscribe(self) -> None:
        """Remove subscriptions."""
        if self._config_unsubscribe:
            self._config_unsubscribe()
        if self._update_unsubscribe:
            self._update_unsubscribe()

    @callback
    def update_weather_stations(self) -> None:
        """Fetch nearest weather stations"""
        self._weather_stations = get_nearest_weather_stations(API_URL, self._home)
        LOGGER.debug('Found %d weather stations nearby', len(self._weather_stations))

        self.async_update_sensors()

    @callback
    def async_update_sensors(self, _: datetime | None = None) -> None:
        self.hass.async_add_executor_job(self.update_sensors)

    @callback
    def update_sensors(self, _: datetime | None = None) -> None:
        aqi: float or None = None
        aqi_instant: float or None = None
        pm25: float or None = None
        pm10: float or None = None
        temperature_list: list[float] = []
        humidity_list: list[float] = []
        pressure_list: list[float] = []
        timestamp: int or None = None

        for weather_station in self._weather_stations:
            LOGGER.debug(
                'Fetching readings from the Weather station "%s". URL: %s',
                weather_station.name,
                weather_station.get_url()
            )

            _r = None
            try:
                _r = weather_station.get_readings()
            except requests.RequestException as err:
                LOGGER.warning('Request error: %s', err)
                continue

            if _r is None:
                continue

            _r_timestamp = _r.get('timestamp')

            if timestamp is not None and _r_timestamp < timestamp:
                LOGGER.debug('Skip outdated %s current %d pass %d', weather_station.id, timestamp, _r_timestamp)
                continue

            timestamp = _r_timestamp

            if aqi is None and _r['aqi'] is not None:
                aqi = _r['aqi']

            if aqi_instant is None and _r['aqi_instant'] is not None:
                aqi_instant = _r['aqi_instant']

            if pm25 is None and _r['pm25'] is not None:
                pm25 = _r['pm25']

            if pm10 is None and _r['pm10'] is not None:
                pm10 = _r['pm10']

            if _r['temperature'] is not None:
                temperature_list.append(_r['temperature'])

            if _r['humidity'] is not None:
                humidity_list.append(_r['humidity'])

            if _r['pressure'] is not None:
                pressure_list.append(_r['pressure'])

        temperature = None if len(temperature_list) == 0 else round(sum(temperature_list) / len(temperature_list), 2)
        humidity = None if len(humidity_list) == 0 else round(sum(humidity_list) / len(humidity_list), 2)
        pressure = None if len(pressure_list) == 0 else int(sum(pressure_list) / len(pressure_list))

        LOGGER.debug(
            f"\n-----------------------------------\n"
            f"Air Quality States:\n\n"
            f"AQI: {'None' if aqi is None else str(aqi)}\n"
            f"AQI Instant: {'None' if aqi_instant is None else str(aqi_instant)}\n"
            f"PM2.5: {'None' if pm25 is None else str(pm25)}\n"
            f"PM10: {'None' if pm10 is None else str(pm10)}\n"
            f"Temperature: {'None' if temperature is None else str(temperature)}\n"
            f"Humidity: {'None' if humidity is None else str(humidity)}\n"
            f"Pressure: {'None' if pressure is None else str(pressure)}\n"
            f"-----------------------------------\n"
        )

        self._attr_aqi = aqi
        self._attr_aqi_instant = aqi_instant
        self._attr_pm_2_5 = pm25
        self._attr_pm_10 = pm10
        self._attr_temperature = temperature
        self._attr_humidity = humidity
        self._attr_pressure = pressure

        # Grab current time in case system clock changed since last time we ran.
        next_update = dt_util.utcnow() + UPDATE_INTERVAL

        self._update_unsubscribe = event.async_track_point_in_utc_time(
            self.hass,
            self.async_update_sensors,
            next_update,
        )
        LOGGER.info("Next refresh time: %s", next_update.isoformat(timespec='seconds'))

    @property
    def state(self) -> StateType:
        """Return the state of the airquality api."""
        return None

    @property
    def aqi(self) -> StateType:
        """Return the Air Quality Index (AQI)."""
        return self._attr_aqi

    @property
    def aqi_instant(self) -> StateType:
        """Return the Air Quality Index (AQI) Instant."""
        return self._attr_aqi_instant

    @property
    def pm_2_5(self) -> StateType:
        """Return the particulate matter 2.5 level."""
        return self._attr_pm_2_5

    @property
    def pm_10(self) -> StateType:
        """Return the particulate matter 10 level."""
        return self._attr_pm_10

    @property
    def temperature(self) -> StateType:
        """Return the outside temperature."""
        return self._attr_temperature

    @property
    def humidity(self) -> StateType:
        """Return the outside humidity."""
        return self._attr_humidity

    @property
    def pressure(self) -> StateType:
        """Return the pressure."""
        return self._attr_pressure

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Return the state attributes of the airquality api."""
        return {
            ATTR_AIR_QUALITY_INDEX: self._attr_aqi,
            ATTR_AIR_QUALITY_INDEX_INSTANT: self._attr_aqi_instant,
            ATTR_PM_2_5: self._attr_pm_2_5,
            ATTR_PM_10: self._attr_pm_10,
            ATTR_TEMPERATURE: self._attr_temperature,
            ATTR_HUMIDITY: self._attr_humidity,
            ATTR_PRESSURE: self._attr_pressure,
        }
