import logging
from datetime import datetime
from typing import Any

import requests
from geopy import distance as ds

LOGGER = logging.getLogger(__name__)

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) '
                  'Chrome/111.0.0.0 Safari/537.36',
    'Content-Type': 'application/json',
}


class WeatherStation:
    id: str
    name: str
    latitude: float
    longitude: float
    distance: float
    project_name: str
    project_description: str

    _data_url: str

    def __init__(self, _api: str, _site: dict[str, Any], _project: dict[str, Any], _distance: float):
        self.id = str(_site.get('id'))
        self.name = _site.get('name')
        self.latitude = _site.get('geom_y')
        self.longitude = _site.get('geom_x')
        self.distance = _distance
        self.project_name = _project.get('name')
        self.project_description = _project.get('description')

        self._data_url = _api + '/data?time_interval=hour&sites=' + self.id

    def get_url(self) -> str:
        """Returns weather station data url"""
        return self._data_url

    def get_readings(self) -> dict[str, int or float or None] or None:
        """Fetch readings from the weather station"""
        r = requests.get(self._data_url, headers=HEADERS)
        r.raise_for_status()

        data: list[dict[str, Any]] = r.json().get('data')
        if len(data) == 0:
            return None

        data = sorted(data, key=lambda d: parse_date(d.get('time')))

        # Sometimes the database does not have time to fill with data, then we take the previous record, if it exists
        readings = data.pop()
        prev = data.pop() if len(data) > 0 else None
        if prev is not None and len(readings) < len(prev):
            readings = prev

        # Remove pressure invalid value
        pressure: float or None = readings.get('p', None)
        if pressure is not None and pressure < 500:
            del readings['p']

        # The least one value should be defined
        if 'aqi' not in data and 'iaqi' not in data and 'pm25' in data and 'pm10' in data and 't' in data \
                and 'h' in data and 'p' in data:
            return None

        LOGGER.debug('Found readings %s', readings)

        return {
            'aqi': readings.get('aqi', None),
            'aqi_instant': readings.get('iaqi', None),
            'pm10': readings.get('pm10', None),
            'pm25': readings.get('pm25', None),
            'temperature': readings.get('t', None),
            'humidity': readings.get('h', None),
            'pressure': readings.get('p', None),
            'timestamp': int(parse_date(readings.get('time')).timestamp()),
        }


def get_nearest_weather_stations(api: str, home: tuple[float, float], max_distance: int = 2000) -> list[WeatherStation]:
    """We get data from weather stations and calculate the coordinates of those that are nearby"""

    url = api + '/projects'
    r = requests.get(url, headers=HEADERS)
    r.raise_for_status()

    _projects = r.json().get('data')
    _weather_stations: list[WeatherStation] = []

    for _project in _projects:
        project_url = api + '/projects/' + str(_project.get('id'))
        r = requests.get(project_url, headers=HEADERS)
        if r.status_code != 200:
            continue

        _sites = r.json().get('data').get('sites')
        for _site in _sites:
            _point = (_site.get('geom_y'), _site.get('geom_x'))
            _distance = ds.distance(home, _point).m

            if _distance < max_distance:
                _weather_stations.append(WeatherStation(api, _site, _project, _distance))

    return sorted(_weather_stations, key=lambda l: l.distance)


def parse_date(raw: str) -> datetime or None:
    """Parse date string from API (Like 2023-05-12 17:00:00)"""
    try:
        return datetime.strptime(raw + ' +0700', '%Y-%m-%d %H:%M:%S %z')

    except ValueError:
        return None
