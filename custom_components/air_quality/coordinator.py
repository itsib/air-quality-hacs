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
    DEFAULT_REFRESH_INTERVAL,
    DEFAULT_STATIONS_USAGE_COUNT,
    DEFAULT_SEARCH_RADIUS,
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
from .weather_station import WeatherStation, Project, WeatherValue

LOGGER = logging.getLogger(__name__)


class AirQualityCoordinator(DataUpdateCoordinator):
    """This class is engaged in updating sensors for the Air Quality extension."""
    hass: HomeAssistant
    entity_id: str
    home: tuple[float, float]

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
            update_interval=DEFAULT_REFRESH_INTERVAL,
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

                if _distance < DEFAULT_SEARCH_RADIUS:
                    station = WeatherStation(self.hass, _project, _position, _distance)
                    self._weather_stations.append(station)

        LOGGER.debug('Found %d weather stations nearby', len(self._weather_stations))

    async def _async_update_data(self):
        """Update weather station data."""
        aqi: WeatherValue or None = None
        aqi_instant: WeatherValue or None = None
        pm25: WeatherValue or None = None
        pm10: WeatherValue or None = None
        temperature_list: list[WeatherValue] = []
        humidity_list: list[WeatherValue] = []
        pressure_list: list[WeatherValue] = []
        updated = datetime.fromtimestamp(int(datetime.today().timestamp()))

        remained = DEFAULT_STATIONS_USAGE_COUNT
        self._weather_stations = sorted(self._weather_stations, key=lambda l: l.sort())
        self._weather_stations.reverse()

        def get_better_value(new_value: WeatherValue | None, old_value: WeatherValue | None) -> WeatherValue | None:
            if new_value is not None and old_value is not None:
                return new_value if old_value.timestamp < new_value.timestamp  else old_value
            elif new_value is not None and old_value is None:
                return new_value
            else:
                return old_value

        def compute_average_value(values: list[WeatherValue]) -> WeatherValue | None:
            if len(values) == 0:
                return None
            values = sorted(values, key=lambda l: l.timestamp)

            _sum = 0
            _count = 0
            _timestamp = values[0].timestamp
            _station = values[0].station
            _distance = values[0].distance
            for value in values:
                if value.timestamp != _timestamp:
                    break
                _sum = _sum + value.value
                _count = _count + 1

            if _count == 0:
                return None

            return WeatherValue(round(_sum / _count, 2), _timestamp, _station, _distance)

        for station in self._weather_stations:
            LOGGER.debug(
                f'Fetching data from the Weather Station "{station.name}". Distance from house: {station.distance} meters. Rating: {station.rating}'
            )

            _dataset = await station.async_fetch_data()
            if _dataset is None:
                station.dislike(6)
                continue

            _aqi = _dataset.get(ATTR_AQI)
            _aqi_instant = _dataset.get(ATTR_AQI_INSTANT)
            _pm25 = _dataset.get(ATTR_PM_2_5)
            _pm10 = _dataset.get(ATTR_PM_10)
            _temperature = _dataset.get(ATTR_TEMPERATURE)
            _humidity = _dataset.get(ATTR_HUMIDITY)
            _pressure = _dataset.get(ATTR_PRESSURE)

            aqi = get_better_value(_aqi, aqi)
            aqi_instant = get_better_value(_aqi_instant, aqi_instant)
            pm25 = get_better_value(_pm25, pm25)
            pm10 = get_better_value(_pm10, pm10)

            if _temperature is not None:
                temperature_list.append(_temperature)

            if _humidity is not None:
                humidity_list.append(_humidity)

            if _pressure is not None:
                pressure_list.append(_pressure)

            if aqi is not None \
                    and aqi_instant is not None \
                    and pm25 is not None \
                    and pm10 is not None \
                    and min(len(temperature_list), len(humidity_list), len(pressure_list)) > 0:
                remained = remained - 1

            if remained <= 0:
                break


        temperature = compute_average_value(temperature_list)
        humidity = compute_average_value(humidity_list)
        pressure = compute_average_value(pressure_list)

        LOGGER.debug(
            f"\n-----------------------------------\n"
            f"Air Quality States:\n\n"
            f"AQI: {'None' if aqi is None else str(aqi.value)}\n"
            f"AQI Instant: {'None' if aqi_instant is None else str(aqi_instant.value)}\n"
            f"PM2.5: {'None' if pm25 is None else str(pm25.value)}\n"
            f"PM10: {'None' if pm10 is None else str(pm10.value)}\n"
            f"Temperature: {'None' if temperature is None else str(temperature.value)}\n"
            f"Humidity: {'None' if humidity is None else str(humidity.value)}\n"
            f"Pressure: {'None' if pressure is None else str(pressure.value)}\n"
            f"Updated: {updated.isoformat()}\n"
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
