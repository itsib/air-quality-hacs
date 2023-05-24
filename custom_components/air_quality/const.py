"""Constants of the Airquality Sensors"""
from typing import Final
from datetime import timedelta

DOMAIN: Final = "air_quality"
NAME: Final = "Air Quality"
API_URL: Final = "https://air.krasn.ru/api/2.0"

ATTRIBUTION: Final = "API provided by air.krasn.ru"

DEVICE_MANUFACTURER: Final = "air.krasn.ru"
DEVICE_MODEL: Final = "Air Quality Sensors KRSK"

UPDATE_INTERVAL = timedelta(minutes=5)

ATTR_AIR_QUALITY_INDEX: Final = "aqi"
ATTR_AIR_QUALITY_INDEX_INSTANT: Final = "aqi_instant"
ATTR_PM_2_5: Final = "pm_2_5"
ATTR_PM_10: Final = "pm_10"
ATTR_TEMPERATURE: Final = "temperature"
ATTR_HUMIDITY: Final = "humidity"
ATTR_PRESSURE: Final = "pressure"
