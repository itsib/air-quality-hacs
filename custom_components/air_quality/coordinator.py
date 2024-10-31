import logging
import requests
from datetime import datetime
from typing import Any
from geopy import distance as ds
from homeassistant.core import HomeAssistant
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator
from homeassistant.helpers.entity import DeviceInfo
from homeassistant.helpers.device_registry import DeviceEntryType

from .const import (
    DOMAIN,
    NAME,
    ATTRIBUTION,
    PROJECT_URL,
    DEVICE_MANUFACTURER,
    DEVICE_MODEL,
    UPDATE_INTERVAL,
    ATTR_AQI,
    ATTR_AQI_INSTANT,
    ATTR_PM_2_5,
    ATTR_PM_10,
    ATTR_TEMPERATURE,
    ATTR_HUMIDITY,
    ATTR_PRESSURE,
    ATTR_UPDATED,
    API_URL,
    API_HEADERS
)
from .weather_station import WeatherStation, Project

LOGGER = logging.getLogger(__name__)


class AirQualityCoordinator(DataUpdateCoordinator):
    """This class is engaged in updating sensors for the Air Quality extension."""
    hass: HomeAssistant
    entity_id: str
    home: tuple[float, float]

    _stations_count: int = 2
    _distance_from_home: float = 2000
    _weather_stations: list[WeatherStation] = []
    _attr_name: str = NAME
    _attr_attribution: str = ATTRIBUTION

    def __init__(self, hass: HomeAssistant, entry_id: str) -> None:
        """Initialize the Air Quality coordinator."""

        self.hass = hass
        self.entity_id = f"{DOMAIN}.{DOMAIN}_{str(hass.config.latitude)}_{str(hass.config.longitude)}"

        self.device_info = DeviceInfo(
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
            update_interval=UPDATE_INTERVAL,
            always_update=True,
        )


    async def _async_setup(self):
        self.home = (self.hass.config.latitude, self.hass.config.longitude)
        self._weather_stations = []

        _raw_projects = await self._async_get_projects()

        for _raw_project in _raw_projects:
            _project = Project(_raw_project)
            url = API_URL + '/projects/' + str(_project.id)

            _positions = await self._async_get_weather_stations_positions(url)
            if _positions is None:
                continue

            for _position in _positions:
                _point = (_position.get('geom_y'), _position.get('geom_x'))
                _distance = ds.distance(self.home, _point).m

                if _distance < self._distance_from_home:
                    station = WeatherStation(self.hass, _project, _position, _distance)
                    self._weather_stations.append(station)

        LOGGER.debug('Found %d weather stations nearby', len(self._weather_stations))


    async def _async_update_data(self):
        """Update weather station data."""
        aqi: float or None = None
        aqi_instant: float or None = None
        pm25: float or None = None
        pm10: float or None = None
        temperature_list: list[float] = []
        humidity_list: list[float] = []
        pressure_list: list[float] = []
        timestamp: int or None = None

        self._weather_stations = sorted(self._weather_stations, key=lambda l: l.rating)
        _stations = self._weather_stations[0:self._stations_count]
        _stations = sorted(_stations, key=lambda l: l.distance)
        _stations.reverse()

        for station in self._weather_stations:
            LOGGER.debug(
                f'Fetching data from the Weather Station "{station.name}". Distance from house: {station.distance} meters. Rating: {station.rating}'
            )

            _data = await station.async_fetch_data()
            if _data is None:
                continue

            _r_timestamp = _data.get(ATTR_UPDATED)

            if timestamp is not None and _r_timestamp < timestamp:
                LOGGER.debug('Skip outdated %s current %d pass %d', station.id, timestamp, _r_timestamp)
                continue

            timestamp = _r_timestamp

            if aqi is None and _data[ATTR_AQI] is not None:
                aqi = _data[ATTR_AQI]

            if aqi_instant is None and _data[ATTR_AQI_INSTANT] is not None:
                aqi_instant = _data[ATTR_AQI_INSTANT]

            if pm25 is None and _data[ATTR_PM_2_5] is not None:
                pm25 = _data[ATTR_PM_2_5]

            if pm10 is None and _data[ATTR_PM_10] is not None:
                pm10 = _data[ATTR_PM_10]

            if _data[ATTR_TEMPERATURE] is not None:
                temperature_list.append(_data[ATTR_TEMPERATURE])

            if _data[ATTR_HUMIDITY] is not None:
                humidity_list.append(_data[ATTR_HUMIDITY])

            if _data[ATTR_PRESSURE] is not None:
                pressure_list.append(_data[ATTR_PRESSURE])

            _count = min(len(temperature_list), len(humidity_list), len(pressure_list))
            if _count >= self._stations_count \
                    and aqi is not None \
                    and aqi_instant is not None \
                    and pm25 is not None \
                    and pm10 is not None:
                break

        temperature = None if len(temperature_list) == 0 else round(sum(temperature_list) / len(temperature_list), 2)
        humidity = None if len(humidity_list) == 0 else round(sum(humidity_list) / len(humidity_list), 2)
        pressure = None if len(pressure_list) == 0 else round(sum(pressure_list) / len(pressure_list), 0)
        updated = datetime.now()

        LOGGER.debug(
            f"\n-----------------------------------\n"
            f"\x1b[4mAir Quality States:\x1b[0m\n\n"
            f"AQI: {'None' if aqi is None else str(aqi)}\n"
            f"AQI Instant: {'None' if aqi_instant is None else str(aqi_instant)}\n"
            f"PM2.5: {'None' if pm25 is None else str(pm25)}\n"
            f"PM10: {'None' if pm10 is None else str(pm10)}\n"
            f"Temperature: {'None' if temperature is None else str(temperature)}\n"
            f"Humidity: {'None' if humidity is None else str(humidity)}\n"
            f"Pressure: {'None' if pressure is None else str(pressure)}\n"
            f"Last Seen: {updated}\n"
            f"-----------------------------------\n"
        )

        return {
            ATTR_AQI: aqi,
            ATTR_AQI_INSTANT: aqi_instant,
            ATTR_PM_2_5: pm25,
            ATTR_PM_10: pm10,
            ATTR_TEMPERATURE: temperature,
            ATTR_HUMIDITY: humidity,
            ATTR_PRESSURE: pressure,
            ATTR_UPDATED: updated,
        }


    async def _async_get_projects(self) -> list[dict[str, Any]]:
        """Get information about organizations that provide data"""
        url = API_URL + '/projects'

        res = await self.hass.async_add_executor_job(requests.get, url, dict(headers=API_HEADERS))
        res.raise_for_status()

        return res.json().get('data')


    async def _async_get_weather_stations_positions(self, url: str) -> list[dict[str, Any]] | None:
        """Get information about the location of the weather station"""

        res = await self.hass.async_add_executor_job(requests.get, url, dict(headers=API_HEADERS))
        if res.status_code != 200:
            return None

        return res.json().get('data').get('sites')