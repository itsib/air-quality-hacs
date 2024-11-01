"""
The file contains the classes necessary to receive data from
the weather station. As well as a description and location of it.
"""
import logging
from datetime import datetime
from typing import Any

import requests
from homeassistant.core import HomeAssistant

from .const import (
    ATTR_AQI,
    ATTR_AQI_INSTANT,
    ATTR_PM_10,
    ATTR_PM_2_5,
    ATTR_TEMPERATURE,
    ATTR_HUMIDITY,
    ATTR_PRESSURE,
    API_HEADERS,
    API_URL,
    DEFAULT_SEARCH_RADIUS,
)

LOGGER = logging.getLogger(__name__)


class Project:
    """
    Description of the organization that owns the weather station.

    Attributes:
        id: Organization ID from API https://air.krasn.ru/api/2.0/projects
        name: Organization name
        description: A brief description of the organization and what it does
        short_name: The organization's code. Used in returned objects.
        owner_name: Legal name of the organization
        owner_url: Website of the organization.
    """
    id: str
    name: str
    description: str
    short_name: str
    owner_name: str
    owner_url: str

    def __init__(self, project: dict[str, Any]):
        _owner: dict[str, str] = project.get('owner')
        self.id = str(project.get('id'))
        self.name = project.get('name')
        self.description = project.get('description')
        self.short_name = project.get('short_name')
        self.owner_name = _owner.get('name')
        self.owner_url = _owner.get('url')

class WeatherValue:
    value: float
    timestamp: int
    station: str
    distance: float

    def __init__(self, value: float, timestamp: int, station: str, distance: float):
        self.value = value
        self.timestamp = timestamp
        self.station = station
        self.distance = distance

    def __str__(self):
        return f"WeatherValue(value='{self.value}', timestamp='{self.timestamp}', station='{self.station}', distance='{self.distance}')"

    def __repr__(self):
        return f"WeatherValue(value='{self.value}', timestamp='{self.timestamp}', station='{self.station}', distance='{self.distance}')"


class WeatherStation:
    """
    Representation the state of the physical weather station
    located at the specified location.

    Attributes:
        id:         Weather Station ID
        name:       District when place weather station
        latitude:   The place where weather station it is located
        longitude:  The place where weather station it is located
        distance:   The distance in meters from the house to the weather station
        project:    Description of the organization serving the weather station
        rating:     The priority of the weather station or the assigned rating.
                    If the weather station does not respond to requests,
                    or there is not enough data, then the rating
                    is lowered.
    """
    id: str
    name: str
    latitude: float
    longitude: float
    distance: float
    project: Project
    rating: int = 100

    _hass: HomeAssistant
    _endpoint_url: str

    def __init__(self, hass: HomeAssistant, project: Project, info: dict[str, Any], distance: float):
        self.id = str(info.get('id'))
        self.name = info.get('name')
        self.latitude = info.get('geom_y')
        self.longitude = info.get('geom_x')
        self.distance = distance
        self.project = project

        self._hass = hass
        self._endpoint_url = API_URL + '/data?time_interval=hour&sites=' + self.id

    @staticmethod
    def parse_date(raw: str | None) -> int | None:
        """Parse date string from API (Like 2023-05-12 17:00:00)"""
        if raw is None:
            return None
        try:
            return int(datetime.strptime(raw + ' +0700', '%Y-%m-%d %H:%M:%S %z').timestamp())
        except ValueError:
            return None

    def get_value(self, key: str, dataset: list[dict[str, Any]]) -> WeatherValue | None:
        latest = dataset[0]
        previous = dataset[1]
        selected = None

        if latest is not None and previous is None:
            selected = latest
        elif latest is not None and previous is not None:
            _latestValue = latest.get(key)
            _previousValue = previous.get(key)
            selected = previous if _latestValue is None else latest
        elif previous is not None:
            selected = previous

        if selected is None:
            return None


        timestamp = self.parse_date(selected.get('time'))
        value = selected.get(key)
        if timestamp is None or value is None:
            return None

        # Remove pressure invalid value
        if key == 'p' and value < 500:
            return None

        return WeatherValue(value, timestamp, self.name, self.distance)

    def _format_result(self, _dataset: list[dict[str, Any]]) -> dict[str, WeatherValue | None] | None:
        """Format result for API call, and compute best readings"""
        _dataset = sorted(_dataset, key=lambda d: self.parse_date(d.get('time')))
        _dataset.reverse()

        _aqi = self.get_value('aqi', _dataset)
        _aqi_instant = self.get_value('iaqi', _dataset)
        _pm_10 = self.get_value('pm10', _dataset)
        _pm_2_5 = self.get_value('pm25', _dataset)
        _temperature = self.get_value('t', _dataset)
        _humidity = self.get_value('h', _dataset)
        _pressure = self.get_value('p', _dataset)

        if _aqi is None and _aqi_instant is None \
                and _pm_10 is None and _pm_2_5 is None \
                and _temperature is None and _humidity is None and _pressure is None:
            return None

        result = {
            ATTR_AQI: _aqi,
            ATTR_AQI_INSTANT: _aqi_instant,
            ATTR_PM_10: _pm_10,
            ATTR_PM_2_5: _pm_2_5,
            ATTR_TEMPERATURE: _temperature,
            ATTR_HUMIDITY: _humidity,
            ATTR_PRESSURE: _pressure,
        }
        return result

    def like(self, count: int = 1):
        self.rating = self.rating + count

    def dislike(self, count: int = 1):
        self.rating = self.rating - count

    def sort(self):
        # _distanceRating = 100 - (self.distance / DEFAULT_SEARCH_RADIUS * 100)
        # return _distanceRating + self.rating
        return 100 - (self.distance / DEFAULT_SEARCH_RADIUS * 100)


    async def async_fetch_data(self) -> dict[str, WeatherValue | None] | None:
        """Fetch readings from the weather station"""
        _dataset: list[dict[str, Any]]

        try:
            res = await self._hass.async_add_executor_job(requests.get, self._endpoint_url, dict(headers = API_HEADERS))
            res.raise_for_status()
            _dataset = res.json().get('data')
            if len(_dataset) == 0:
                return None

            return self._format_result(_dataset)

        except requests.RequestException as err:
            LOGGER.warning('Request error: %s', err)

        return None
