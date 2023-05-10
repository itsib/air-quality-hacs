"""The Air Quality Sensors integration."""
from __future__ import annotations
import logging
from typing import Any
from datetime import datetime, timedelta
import requests

from homeassistant.config_entries import SOURCE_IMPORT, ConfigEntry
from homeassistant.const import Platform, EVENT_CORE_CONFIG_UPDATE
from homeassistant.core import HomeAssistant, callback, CALLBACK_TYPE, Event
from homeassistant.helpers import event
from homeassistant.helpers.entity import Entity
from homeassistant.helpers.typing import ConfigType, StateType
from homeassistant.helpers.integration_platform import (
    async_process_integration_platform_for_component,
)
from homeassistant.util import dt as dt_util

from .const import (
    DOMAIN,
    NAME,
    ENTITY_ID,
    DEVICE_MODEL,
    STATE_OFFLINE,
    ATTRIBUTION,
    DEVICE_MANUFACTURER,
    ATTR_PLACE,
    ATTR_AIR_QUALITY_INDEX,
    ATTR_AIR_QUALITY_INDEX_INSTANT,
    ATTR_PARTICULATE_MATTER_2_5,
    ATTR_TEMPERATURE,
    ATTR_HUMIDITY,
    API_URL,
)
from .utils import closest_points

LOGGER = logging.getLogger(__name__)
UPDATE_INTERVAL = timedelta(minutes=5)
PLATFORMS = [Platform.SENSOR]


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Track the state of the Airquality sensors."""
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
    entity_id = ENTITY_ID

    _attr_name = NAME
    _attr_attribution = ATTRIBUTION

    _attr_place: StateType = None
    _attr_aqi: StateType = None
    _attr_aqi_instant: StateType = None
    _attr_pm_2_5: StateType = None
    _attr_temperature: StateType = None
    _attr_humidity: StateType = None

    _longitude: float | None = None
    _latitude: float | None = None

    _sites: list[dict[str, Any]] = []

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
        if not initial and self.hass.config.longitude == self._longitude and self.hass.config.latitude == self._latitude:
            return

        self._longitude = self.hass.config.longitude
        self._latitude = self.hass.config.latitude

        if self._update_unsubscribe:
            self._update_unsubscribe()

        self.hass.async_add_executor_job(self.update_sites)

    @callback
    def unsubscribe(self) -> None:
        """Remove subscriptions."""
        if self._config_unsubscribe:
            self._config_unsubscribe()
        if self._update_unsubscribe:
            self._update_unsubscribe()

    @callback
    def update_sites(self) -> None:
        url = API_URL + '/projects'
        r = requests.get(url, headers={'User-Agent': 'Home Assistant', 'Content-Type': 'application/json'})
        r.raise_for_status()

        projects = r.json().get('data')
        sites: list[dict[str, Any]] = []

        for project in projects:
            project_url = API_URL + '/projects/' + str(project.get('id'))
            r = requests.get(project_url, headers={'User-Agent': 'Home Assistant', 'Content-Type': 'application/json'})
            if r.status_code == 200:
                sites.extend(r.json().get('data').get('sites'))
            else:
                LOGGER.warning('Request fail. URL: %s', project_url)

        target = {'longitude': self._longitude, 'latitude': self._latitude}
        self._sites = closest_points(sites, target, 5)

        LOGGER.debug('%s', self._sites)

        self.async_update_sensors()

    @callback
    def async_update_sensors(self, _: datetime | None = None) -> None:
        self.hass.async_add_executor_job(self.update_sensors)

    @callback
    def update_sensors(self, _: datetime | None = None) -> None:
        data = self._fetch_sensors_states()
        aqi: float = data.get('aqi')
        aqi_instant: float = data.get('iaqi')
        pm25: float = data.get('pm25')
        temperature: float = data.get('t')
        humidity: float = data.get('h')

        LOGGER.info(
            "AQI: \x1b[33;20m%.2f\x1b[32m AQI Instant: \x1b[33;20m%.2f\x1b[32m PM2.5: \x1b[33;20m%.2f\x1b[32m "
            "Temperature: \x1b[33;20m%.2f°C\x1b[32m Humidity: \x1b[33;20m%.2f%%\x1b[32m",
            aqi,
            aqi_instant,
            pm25,
            temperature,
            humidity,
        )

        self._attr_aqi = aqi
        self._attr_aqi_instant = aqi_instant
        self._attr_pm_2_5 = pm25
        self._attr_temperature = temperature
        self._attr_humidity = humidity

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
    def place(self) -> StateType:
        """Return place name."""
        return self._attr_place

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
    def temperature(self) -> StateType:
        """Return the outside temperature."""
        return self._attr_temperature

    @property
    def humidity(self) -> StateType:
        """Return the outside humidity."""
        return self._attr_humidity

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Return the state attributes of the airquality api."""
        return {
            ATTR_PLACE: self._attr_place,
            ATTR_AIR_QUALITY_INDEX: self._attr_aqi,
            ATTR_AIR_QUALITY_INDEX_INSTANT: self._attr_aqi_instant,
            ATTR_PARTICULATE_MATTER_2_5: self._attr_pm_2_5,
            ATTR_TEMPERATURE: self._attr_temperature,
            ATTR_HUMIDITY: self._attr_humidity,
        }

    def _fetch_sensors_states(self) -> dict[str, Any]:
        for site in self._sites:
            url = API_URL + '/data?sites=' + str(site.get('id'))

            LOGGER.debug('Try data fetch from: %s', url)

            r = requests.get(url, headers={'User-Agent': 'Home Assistant', 'Content-Type': 'application/json'})
            if r.status_code != 200:
                LOGGER.warning('Response status code: %d', r.status_code)
                continue

            datas = r.json().get('data')
            if len(datas) == 0:
                LOGGER.warning('Response with no data')
                continue

            data: dict[str, Any] = datas.pop()
            if 'aqi' in data and 'iaqi' in data and 'pm25' in data and 't' in data and 'h' in data:
                self._attr_place = site.get('name')
                return data



