"""
The file contains the classes necessary to receive data from
the weather station. As well as a description and location of it.
"""
import logging
from typing import Any

import requests
from homeassistant.core import HomeAssistant

from .const import (
    API_HEADERS,
    API_URL,
)
from .utils.extract import format_api_response
from .utils.organization import Organization
from .utils.entity_keys import EntityKey

LOGGER = logging.getLogger(__name__)


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
    project: Organization
    rating: int = 100

    _hass: HomeAssistant
    _endpoint_url: str

    def __init__(self, hass: HomeAssistant, project: Organization, info: dict[str, Any], distance: float):
        self.id = str(info.get('id'))
        self.name = info.get('name')
        self.latitude = info.get('geom_y')
        self.longitude = info.get('geom_x')
        self.distance = distance
        self.project = project

        self._hass = hass
        self._endpoint_url = API_URL + '/data?time_interval=hour&sites=' + self.id

    async def async_fetch_data(self) -> dict[EntityKey, float | None] | None:
        """Fetch readings from the weather station"""
        _dataset: list[dict[str, Any]]

        try:
            res = await self._hass.async_add_executor_job(requests.get, self._endpoint_url, dict(headers = API_HEADERS))
            res.raise_for_status()
            _dataset = res.json().get('data')
            if len(_dataset) < 1:
                return None
            return format_api_response(_dataset)

        except requests.RequestException as err:
            LOGGER.warning('Request error: %s', err)

        return None
