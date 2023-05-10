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
    PERCENTAGE,
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
    ATTR_PLACE,
    ATTR_AIR_QUALITY_INDEX,
    ATTR_AIR_QUALITY_INDEX_INSTANT,
    ATTR_PARTICULATE_MATTER_2_5,
    ATTR_TEMPERATURE,
    ATTR_HUMIDITY,
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
        key=ATTR_PLACE,
        translation_key=ATTR_PLACE,
        icon='mdi:map-marker',
        has_entity_name=True,
        value_fn=lambda data: data.place,
    ),
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
        key=ATTR_PARTICULATE_MATTER_2_5,
        device_class=SensorDeviceClass.PM25,
        translation_key=ATTR_PARTICULATE_MATTER_2_5,
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=lambda data: data.pm_2_5,
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
)


async def async_setup_entry(
        hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback
) -> None:
    """Set up Sun sensor platform."""

    air_quality: Airquality = hass.data[DOMAIN]

    async_add_entities(
        [AirQualitySensor(air_quality, description, entry.entry_id) for description in SENSOR_TYPES]
    )


class AirQualitySensor(SensorEntity):
    """Representation of a Sun Sensor."""

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
