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
    ATTR_UPDATED,
    API_HEADERS,
    API_URL,
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
    def parse_date(raw: str) -> datetime or None:
        """Parse date string from API (Like 2023-05-12 17:00:00)"""
        try:
            return datetime.strptime(raw + ' +0700', '%Y-%m-%d %H:%M:%S %z')
        except ValueError:
            return None

    def _format_result(self, _data: list[dict[str, Any]]):
        """Format result for API call, and compute best readings"""
        _data = sorted(_data, key=lambda d: self.parse_date(d.get('time')))

        # Sometimes the database does not have time to fill with data, then we take the previous record, if it exists
        readings = _data.pop()
        prev = _data.pop() if len(_data) > 0 else None
        if prev is not None and len(readings) < len(prev):
            readings = prev

        # Remove pressure invalid value
        pressure: float | None = readings.get('p', None)
        if pressure is not None and pressure < 500:
            del readings['p']

        # The least one value should be defined
        if 'aqi' not in readings \
                and 'iaqi' not in readings \
                and 'pm25' in readings \
                and 'pm10' in readings \
                and 't' in readings \
                and 'h' in readings \
                and 'p' in readings:
            self.rating -= 15
            return None

        LOGGER.debug('Found readings %s', readings)

        if len(readings) < 7:
            self.rating += (len(readings) - 7)

        return {
            ATTR_AQI: readings.get('aqi', None),
            ATTR_AQI_INSTANT: readings.get('iaqi', None),
            ATTR_PM_10: readings.get('pm10', None),
            ATTR_PM_2_5: readings.get('pm25', None),
            ATTR_TEMPERATURE: readings.get('t', None),
            ATTR_HUMIDITY: readings.get('h', None),
            ATTR_PRESSURE: readings.get('p', None),
            ATTR_UPDATED: int(self.parse_date(readings.get('time')).timestamp()),
        }

    async def async_fetch_data(self) -> dict[str, int | float | None] | None:
        """Fetch readings from the weather station"""
        _data: list[dict[str, Any]]

        try:
            res = await self._hass.async_add_executor_job(requests.get, self._endpoint_url, dict(headers = API_HEADERS))
            res.raise_for_status()
            _data = res.json().get('data')
            if len(_data) == 0:
                self.rating -= 10
                return None

            return self._format_result(_data)

        except requests.RequestException as err:
            LOGGER.warning('Request error: %s', err)

        return None
