"""Constants of the Airquality Sensors"""
from datetime import timedelta
from typing import Final

from homeassistant.components.esphome.const import PROJECT_URLS

DOMAIN: Final = "air_quality"
BASE_URL = "/air_quality_files"
NAME: Final = "Air Quality"

API_URL: Final = "https://air.krasn.ru/api/2.0"
API_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) '
                  'Chrome/111.0.0.0 Safari/537.36',
    'Content-Type': 'application/json',
}

ATTRIBUTION: Final = "API provided by air.krasn.ru"
PROJECT_URL: Final = "https://air.krasn.ru/"
DEVICE_MANUFACTURER: Final = "air.krasn.ru"
DEVICE_MODEL: Final = "Air Quality Sensors"

UPDATE_INTERVAL = timedelta(minutes=3)

ATTR_AQI: Final = "aqi"
ATTR_AQI_INSTANT: Final = "aqi_instant"
ATTR_PM_2_5: Final = "pm_2_5"
ATTR_PM_10: Final = "pm_10"
ATTR_TEMPERATURE: Final = "temperature"
ATTR_HUMIDITY: Final = "humidity"
ATTR_PRESSURE: Final = "pressure"
ATTR_UPDATED: Final = "updated"


SENSORS: Final = [
    ATTR_AQI,
    ATTR_AQI_INSTANT,
    ATTR_PM_2_5,
    ATTR_PM_10,
    ATTR_TEMPERATURE,
    ATTR_HUMIDITY,
    ATTR_PRESSURE,
]