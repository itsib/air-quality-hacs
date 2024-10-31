from homeassistant.components.sensor import SensorDeviceClass
from homeassistant.const import CONCENTRATION_MICROGRAMS_PER_CUBIC_METER, UnitOfTemperature, PERCENTAGE, UnitOfPressure

from .const import (
    ATTR_AQI,
    ATTR_AQI_INSTANT,
    ATTR_PM_2_5,
    ATTR_PM_10,
    ATTR_TEMPERATURE,
    ATTR_HUMIDITY,
    ATTR_PRESSURE,
)


def get_device_class(data_key: str) -> SensorDeviceClass:
    if data_key == ATTR_AQI_INSTANT or data_key == ATTR_AQI:
        return SensorDeviceClass.AQI
    elif data_key == ATTR_PM_10:
        return SensorDeviceClass.PM10
    elif data_key == ATTR_PM_2_5:
        return SensorDeviceClass.PM25
    elif data_key == ATTR_HUMIDITY:
        return SensorDeviceClass.HUMIDITY
    elif data_key == ATTR_TEMPERATURE:
        return SensorDeviceClass.TEMPERATURE
    elif data_key == ATTR_PRESSURE:
        return SensorDeviceClass.ATMOSPHERIC_PRESSURE
    else:
        raise ValueError(f"Unknown sensor class {data_key}")

def get_unit_of_measurement(device_class: SensorDeviceClass) -> str | None:
    if device_class == SensorDeviceClass.PM10 or device_class == SensorDeviceClass.PM25:
        return CONCENTRATION_MICROGRAMS_PER_CUBIC_METER
    elif device_class == SensorDeviceClass.TEMPERATURE:
        return UnitOfTemperature.CELSIUS
    elif device_class == SensorDeviceClass.HUMIDITY:
        return PERCENTAGE
    elif device_class == SensorDeviceClass.ATMOSPHERIC_PRESSURE:
        return UnitOfPressure.MMHG
    else:
        return None