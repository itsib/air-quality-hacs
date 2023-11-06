"""Sensor platform for the Air Quality integration."""
from __future__ import annotations

from collections.abc import Callable
from dataclasses import dataclass
from datetime import datetime

from homeassistant.components.sensor import (
    DOMAIN as SENSOR_DOMAIN,
    SensorDeviceClass,
    SensorEntity,
    SensorEntityDescription,
    SensorStateClass,
)
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import (
    UnitOfTemperature,
    CONCENTRATION_MICROGRAMS_PER_CUBIC_METER,
    PERCENTAGE, UnitOfPressure,
)
from homeassistant.core import HomeAssistant
from homeassistant.helpers.device_registry import DeviceEntryType
from homeassistant.helpers.entity import DeviceInfo
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.typing import StateType

from . import Airquality
from .const import (
    DOMAIN,
    NAME,
    DEVICE_MANUFACTURER,
    DEVICE_MODEL,
    ATTRIBUTION,
    ATTR_AIR_QUALITY_INDEX,
    ATTR_AIR_QUALITY_INDEX_INSTANT,
    ATTR_PM_2_5,
    ATTR_TEMPERATURE,
    ATTR_HUMIDITY, ATTR_PM_10, ATTR_PRESSURE,
)

ENTITY_ID_SENSOR_FORMAT = SENSOR_DOMAIN + ".air_quality_{}"


@dataclass
class AirqualityEntityDescriptionMixin:
    """Mixin for required Airquality base description keys."""

    value_fn: Callable[[Airquality], StateType]


@dataclass
class AirqualitySensorEntityDescription(SensorEntityDescription, AirqualityEntityDescriptionMixin):
    """Describes Airquality sensor entity."""


SENSOR_TYPES: tuple[AirqualitySensorEntityDescription, ...] = (
    AirqualitySensorEntityDescription(
        key=ATTR_AIR_QUALITY_INDEX,
        device_class=SensorDeviceClass.AQI,
        translation_key=ATTR_AIR_QUALITY_INDEX,
        state_class=SensorStateClass.MEASUREMENT,
        has_entity_name=True,
        value_fn=lambda data: data.aqi,
    ),
    AirqualitySensorEntityDescription(
        key=ATTR_AIR_QUALITY_INDEX_INSTANT,
        device_class=SensorDeviceClass.AQI,
        translation_key=ATTR_AIR_QUALITY_INDEX_INSTANT,
        state_class=SensorStateClass.MEASUREMENT,
        has_entity_name=True,
        value_fn=lambda data: data.aqi_instant,
    ),
    AirqualitySensorEntityDescription(
        key=ATTR_PM_2_5,
        device_class=SensorDeviceClass.PM25,
        translation_key=ATTR_PM_2_5,
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=lambda data: data.pm_2_5,
        has_entity_name=True,
        native_unit_of_measurement=CONCENTRATION_MICROGRAMS_PER_CUBIC_METER,
    ),
    AirqualitySensorEntityDescription(
        key=ATTR_PM_10,
        device_class=SensorDeviceClass.PM10,
        translation_key=ATTR_PM_10,
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=lambda data: data.pm_10,
        has_entity_name=True,
        native_unit_of_measurement=CONCENTRATION_MICROGRAMS_PER_CUBIC_METER,
    ),
    AirqualitySensorEntityDescription(
        key=ATTR_TEMPERATURE,
        device_class=SensorDeviceClass.TEMPERATURE,
        translation_key=ATTR_TEMPERATURE,
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=lambda data: data.temperature,
        has_entity_name=True,
        native_unit_of_measurement=UnitOfTemperature.CELSIUS,
    ),
    AirqualitySensorEntityDescription(
        key=ATTR_HUMIDITY,
        device_class=SensorDeviceClass.HUMIDITY,
        translation_key=ATTR_HUMIDITY,
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=lambda data: data.humidity,
        has_entity_name=True,
        native_unit_of_measurement=PERCENTAGE,
    ),
    AirqualitySensorEntityDescription(
        key=ATTR_PRESSURE,
        device_class=SensorDeviceClass.PRESSURE,
        translation_key=ATTR_PRESSURE,
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=lambda data: data.pressure,
        has_entity_name=True,
        native_unit_of_measurement=UnitOfPressure.MMHG,
    ),
)


async def async_setup_entry(
        hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback
) -> None:
    """Set up Sun sensor platform."""

    air_quality_krasnoyarsk: Airquality = hass.data[DOMAIN]

    async_add_entities(
        [AirQualitySensor(air_quality_krasnoyarsk, description, entry.entry_id) for description in SENSOR_TYPES]
    )


class AirQualitySensor(SensorEntity):
    """Representation of a Sun Sensor."""
    _attr_assumed_state = True
    _attr_attribution = ATTRIBUTION
    entity_description: AirqualitySensorEntityDescription

    def __init__(
            self,
            airquality: Airquality,
            entity_description: AirqualitySensorEntityDescription,
            entry_id: str,
    ) -> None:
        """Initiate airquality Sensor."""
        self.entity_description = entity_description
        self.entity_id = ENTITY_ID_SENSOR_FORMAT.format(entity_description.key)
        self._attr_unique_id = f"{entry_id}-{entity_description.key}"
        self.airquality = airquality
        self._attr_device_info = DeviceInfo(
            name=NAME,
            identifiers={(DOMAIN, entry_id)},
            entry_type=DeviceEntryType.SERVICE,
            manufacturer=DEVICE_MANUFACTURER,
            model=DEVICE_MODEL
        )

    @property
    def native_value(self) -> StateType | datetime:
        """Return value of sensor."""
        state = self.entity_description.value_fn(self.airquality)
        return state

    # @property
    # def entity_picture(self) -> str | None:
    #     """Return the entity picture to use in the frontend, if any."""
    #     if self.entity_description.key == ATTR_AIR_QUALITY_INDEX \
    #             or self.entity_description.key == ATTR_AIR_QUALITY_INDEX_INSTANT:
    #         return "/air-quality-krasnoyarsk/aqi.svg"
    #     elif self.entity_description.key == ATTR_PM_2_5:
    #         return "/air-quality-krasnoyarsk/pm-2-5.svg"
    #     elif self.entity_description.key == ATTR_PM_10:
    #         return "/air-quality-krasnoyarsk/pm-10.svg"
    #     elif self.entity_description.key == ATTR_TEMPERATURE:
    #         return "/air-quality-krasnoyarsk/temperature.svg"
    #     elif self.entity_description.key == ATTR_HUMIDITY:
    #         return "/air-quality-krasnoyarsk/humidity.svg"
    #     elif self.entity_description.key == ATTR_PRESSURE:
    #         return "/air-quality-krasnoyarsk/pressure.svg"
    #     else:
    #         return self._attr_entity_picture
