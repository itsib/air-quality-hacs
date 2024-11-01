"""Constants of the Air Quality Sensors"""
from datetime import timedelta
from typing import Final

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

DEFAULT_REFRESH_INTERVAL = timedelta(minutes=15)
DEFAULT_SEARCH_RADIUS = 2000