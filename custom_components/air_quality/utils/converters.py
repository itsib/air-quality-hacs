from homeassistant.components.sensor import SensorDeviceClass, SensorStateClass
from homeassistant.const import EntityCategory

from .entity_keys import EntityKey

def get_device_class(entity_key: str) -> SensorDeviceClass:
    if entity_key == EntityKey.AQI_INSTANT or entity_key == EntityKey.AQI:
        return SensorDeviceClass.AQI
    elif entity_key == EntityKey.PM_10:
        return SensorDeviceClass.PM10
    elif entity_key == EntityKey.PM_2_5:
        return SensorDeviceClass.PM25
    elif entity_key == EntityKey.HUMIDITY:
        return SensorDeviceClass.HUMIDITY
    elif entity_key == EntityKey.TEMPERATURE:
        return SensorDeviceClass.TEMPERATURE
    elif entity_key == EntityKey.PRESSURE:
        return SensorDeviceClass.ATMOSPHERIC_PRESSURE
    elif entity_key == EntityKey.UPDATED:
        return SensorDeviceClass.DATE
    elif entity_key == EntityKey.DISTANCE:
        return SensorDeviceClass.DISTANCE
    else:
        raise ValueError(f"Unknown sensor class {entity_key}")

def get_unit_of_measurement(entity_key: str) -> str | None:
    if entity_key == EntityKey.PM_10 or entity_key == EntityKey.PM_2_5:
        return "µg/m³"
    elif entity_key == EntityKey.TEMPERATURE:
        return "°C"
    elif entity_key == EntityKey.HUMIDITY:
        return "%"
    elif entity_key == EntityKey.PRESSURE:
        return "mmHg"
    elif entity_key == EntityKey.DISTANCE:
        return "m"
    else:
        return None

def get_entity_category(entity_key: str) -> EntityCategory | None:
    if entity_key == EntityKey.UPDATED:
        return EntityCategory.DIAGNOSTIC
    elif entity_key == EntityKey.DISTANCE:
        return EntityCategory.DIAGNOSTIC

    return None

def get_state_class(entity_key: str) -> SensorStateClass | None:
    if entity_key == EntityKey.UPDATED:
        return None
    elif entity_key == EntityKey.DISTANCE:
        return None

    return SensorStateClass.MEASUREMENT