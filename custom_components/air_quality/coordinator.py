import logging
from datetime import datetime
from typing import Any

import requests
from geopy import distance as ds
from homeassistant.core import HomeAssistant
from homeassistant.helpers.device_registry import DeviceEntryType
from homeassistant.helpers.entity import DeviceInfo
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator

from .const import (
    DOMAIN,
    NAME,
    ATTRIBUTION,
    PROJECT_URL,
    DEVICE_MANUFACTURER,
    DEVICE_MODEL,
    DEFAULT_REFRESH_INTERVAL,
    DEFAULT_SEARCH_RADIUS,

    API_URL,
    API_HEADERS
)
from .utils.entity_keys import EntityKey
from .utils.organization import Organization
from .weather_station import WeatherStation

LOGGER = logging.getLogger(__name__)


class AirQualityCoordinator(DataUpdateCoordinator):
    """This class is engaged in updating sensors for the Air Quality extension."""
    hass: HomeAssistant
    entity_id: str
    home: tuple[float, float]

    _stations: list[WeatherStation] = []
    _attr_name: str = NAME
    _attr_attribution: str = ATTRIBUTION

    def __init__(self, hass: HomeAssistant, entry_id: str) -> None:
        """Initialize the Air Quality coordinator."""

        self.hass = hass
        self.entity_id = f"{DOMAIN}.{DOMAIN}_{str(hass.config.latitude)}_{str(hass.config.longitude)}"

        self._device = DeviceInfo(
            name=NAME,
            identifiers={(DOMAIN, entry_id)},
            entry_type=DeviceEntryType.SERVICE,
            manufacturer=DEVICE_MANUFACTURER,
            model=DEVICE_MODEL,
            configuration_url=PROJECT_URL
        )

        self.home = (self.hass.config.latitude, self.hass.config.longitude)

        super().__init__(
            hass,
            LOGGER,
            name=self._attr_name,
            update_interval=DEFAULT_REFRESH_INTERVAL,
            always_update=True,
        )

    @property
    def device(self):
        return self._device

    async def _async_setup(self):
        self.home = (self.hass.config.latitude, self.hass.config.longitude)
        self._stations = []

        _raw_organizations = await self._async_get_organizations()

        for _raw_organization in _raw_organizations:
            _organization = Organization(_raw_organization)
            url = API_URL + '/projects/' + str(_organization.id)

            _raw_stations = await self._async_get_stations_positions(url)
            if _raw_stations is None:
                continue

            for _raw_station in _raw_stations:
                _point = (_raw_station.get('geom_y'), _raw_station.get('geom_x'))
                _distance = ds.distance(self.home, _point).m

                if _distance < DEFAULT_SEARCH_RADIUS:
                    station = WeatherStation(self.hass, _organization, _raw_station, _distance)
                    self._stations.append(station)

        LOGGER.debug('Found %d weather stations nearby', len(self._stations))

    async def _async_update_data(self):
        """Update weather station data."""
        aqi: float or None = None
        aqi_instant: float or None = None
        pm25: float or None = None
        pm10: float or None = None
        temperature: float or None = None
        humidity: float or None = None
        pressure: float or None = None
        updated = datetime.fromtimestamp(int(datetime.today().timestamp()))
        distance = None

        self._stations = sorted(self._stations, key=lambda l: l.distance)
        # self._stations.reverse()

        for _station in self._stations:
            def debug(success: bool, msg: str) -> None:
                _status = "✔" if success else "✘"
                LOGGER.debug(f'{_status} weather Station "{_station.name}"; distance: {_station.distance} meters; {msg}')

            _dataset = await _station.async_fetch_data()
            if _dataset is None:
                debug(False, "Empty dataset")
                continue

            _aqi = _dataset.get(EntityKey.AQI)
            _aqi_instant = _dataset.get(EntityKey.AQI_INSTANT)
            _pm25 = _dataset.get(EntityKey.PM_2_5)
            _pm10 = _dataset.get(EntityKey.PM_10)
            _temperature = _dataset.get(EntityKey.TEMPERATURE)
            _humidity = _dataset.get(EntityKey.HUMIDITY)
            _pressure = _dataset.get(EntityKey.PRESSURE)

            if _aqi is None and _aqi_instant is None:
                debug(False, "No AQI and Instant AQI")
                continue

            if _pm25 is None and _pm10 is None:
                debug(False, "No PMs values")
                continue

            if _temperature is None and _humidity is None and _pressure is None:
                debug(False, "No temperature and humidity and pressure")
                continue

            if aqi is None and _aqi is not None:
                aqi = _aqi
            if aqi_instant is None and _aqi_instant is not None:
                aqi_instant = _aqi_instant
            if pm25 is None and _pm25 is not None:
                pm25 = _pm25
            if pm10 is None and _pm10 is not None:
                pm10 = _pm10
            if temperature is None and _temperature is not None:
                temperature = _temperature
            if humidity is None and _humidity is not None:
                humidity = _humidity
            if pressure is None and _pressure is not None:
                pressure = _pressure
            if distance is None:
                distance = round(_station.distance, 0)

            if aqi is not None \
                and aqi_instant is not None \
                and pm25 is not None \
                and pm10 is not None \
                and temperature is not None \
                and humidity is not None \
                and pressure is not None:
                debug(True, "All values filled")
                break

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
            f"Updated: {updated.isoformat()}\n"
            f"Distance: {'None' if distance is None else str(distance)}\n"
            f"-----------------------------------\n"
        )

        return {
            EntityKey.AQI:          aqi,
            EntityKey.AQI_INSTANT:  aqi_instant,
            EntityKey.PM_2_5:       pm25,
            EntityKey.PM_10:        pm10,
            EntityKey.TEMPERATURE:  temperature,
            EntityKey.HUMIDITY:     humidity,
            EntityKey.PRESSURE:     pressure,
            EntityKey.UPDATED:      updated,
            EntityKey.DISTANCE:     distance,
        }

    async def _async_get_organizations(self) -> list[dict[str, Any]]:
        """Get information about organizations that provide data"""
        url = API_URL + '/projects'

        res = await self.hass.async_add_executor_job(requests.get, url, dict(headers=API_HEADERS))
        res.raise_for_status()

        return res.json().get('data')

    async def _async_get_stations_positions(self, url: str) -> list[dict[str, Any]] | None:
        """Get information about the location of the weather station"""

        res = await self.hass.async_add_executor_job(requests.get, url, dict(headers=API_HEADERS))
        if res.status_code != 200:
            return None

        return res.json().get('data').get('sites')
