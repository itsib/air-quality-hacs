from typing import Final
from enum import StrEnum

class EntityKey(StrEnum):
    AQI: Final = "aqi"
    AQI_INSTANT: Final = "aqi_instant"
    PM_2_5: Final = "pm_2_5"
    PM_10: Final = "pm_10"
    TEMPERATURE: Final = "temperature"
    HUMIDITY: Final = "humidity"
    PRESSURE: Final = "pressure"
    UPDATED: Final = "updated"
    DISTANCE: Final = "distance"

SENSORS: Final = [
    EntityKey.AQI,
    EntityKey.AQI_INSTANT,
    EntityKey.PM_2_5,
    EntityKey.PM_10,
    EntityKey.TEMPERATURE,
    EntityKey.HUMIDITY,
    EntityKey.PRESSURE,
    EntityKey.UPDATED,
    EntityKey.DISTANCE,
]