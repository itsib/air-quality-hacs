"""Constants of the Airquality Sensors"""
from typing import Final

DOMAIN: Final = "air_quality"
NAME: Final = "Air Quality"
ENTITY_ID: Final = f"{DOMAIN}.api"
API_URL: Final = "https://air.krasn.ru/api/2.0"

ATTRIBUTION: Final = "API provided by air.krasn.ru"

DEVICE_MANUFACTURER: Final = "air.krasn.ru"
DEVICE_MODEL: Final = "Air Quality Sensors KRSK"

STATE_ONLINE: Final = "online"
STATE_OFFLINE: Final = "offline"

ATTR_PLACE: Final = "place"
ATTR_AIR_QUALITY_INDEX: Final = "aqi"
ATTR_AIR_QUALITY_INDEX_INSTANT: Final = "aqi_instant"
ATTR_PARTICULATE_MATTER_2_5: Final = "pm_2_5"
ATTR_TEMPERATURE: Final = "temperature"
ATTR_HUMIDITY: Final = "humidity"
