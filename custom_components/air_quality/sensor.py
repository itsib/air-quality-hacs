"""Sensor platform for the Air Quality integration."""
from __future__ import annotations

from datetime import datetime

from homeassistant.components.sensor import (
    DOMAIN as SENSOR_DOMAIN,
    RestoreSensor,
    SensorEntity,
    SensorStateClass,
    SensorDeviceClass,
)
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import EntityCategory
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.update_coordinator import CoordinatorEntity
from homeassistant.components.time import TimeEntity
from homeassistant.components.date import DateEntity

from .const import DOMAIN, ATTRIBUTION, SENSORS, DIAGNOSTIC_SENSORS
from .coordinator import AirQualityCoordinator
from .utils import get_device_class, get_unit_of_measurement

ENTITY_ID_SENSOR_FORMAT = SENSOR_DOMAIN + ".air_quality_{}"


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback) -> None:
    """Set up Sun sensor platform."""
    coordinator: AirQualityCoordinator = hass.data[DOMAIN][entry.entry_id]

    # Add main air sensors to home assistant
    async_add_entities(
        [AirQualitySensor(entry.entry_id, data_key, coordinator) for data_key in SENSORS]
    )

    # Add main air sensors to home assistant
    async_add_entities(
        [AirQualityDiagnosticSensor(entry.entry_id, data_key, coordinator) for data_key in DIAGNOSTIC_SENSORS]
    )


class AirQualitySensor(CoordinatorEntity, RestoreSensor):
    """Representation of a Sun Sensor."""
    data_key: str
    coordinator: AirQualityCoordinator

    _attr_assumed_state = True
    _attr_has_entity_name = True
    _attr_attribution = ATTRIBUTION
    _attr_state_class = SensorStateClass.MEASUREMENT

    def __init__(self, entry_id: str, data_key: str, coordinator: AirQualityCoordinator) -> None:
        """Initiate air quality Sensor."""
        super().__init__(coordinator, context=data_key)

        self.data_key = data_key
        self.entity_id = ENTITY_ID_SENSOR_FORMAT.format(self.data_key)
        self.coordinator = coordinator

        self._attr_translation_key = data_key
        self._attr_unique_id = f"{entry_id}-{self.data_key}"
        self._attr_device_class = get_device_class(data_key)
        self._attr_native_unit_of_measurement = get_unit_of_measurement(self._attr_device_class)
        self._attr_device_info = self.coordinator.device_info

    @callback
    def _handle_coordinator_update(self) -> None:
        """Handle updated data from the coordinator."""
        value = self.coordinator.data[self.data_key]
        if value is None:
            return None
        self._attr_native_value = value.value
        self.async_write_ha_state()

    async def async_added_to_hass(self):
        result = await self.async_get_last_sensor_data()
        self._attr_native_value = result.native_value
        self._attr_native_unit_of_measurement = result.native_unit_of_measurement

        await super().async_added_to_hass()

        self.async_on_remove(
            self.coordinator.async_add_listener(
                self._handle_coordinator_update, self.coordinator_context
            )
        )


class AirQualityDiagnosticSensor(CoordinatorEntity, RestoreSensor):
    _attr_device_class: SensorDeviceClass

    def __init__(self, entry_id: str, data_key: str, coordinator: AirQualityCoordinator) -> None:
        """Initiate air quality Sensor."""
        super().__init__(coordinator, context=data_key)

        self.data_key = data_key
        self.entity_id = ENTITY_ID_SENSOR_FORMAT.format(self.data_key)
        self.coordinator = coordinator

        self._attr_unique_id = f"{entry_id}-{self.data_key}"
        self._attr_device_class = get_device_class(self.data_key)
        self._attr_device_info = self.coordinator.device_info
        self._attr_entity_category = EntityCategory.DIAGNOSTIC

    @callback
    def _handle_coordinator_update(self) -> None:
        """Handle updated data from the coordinator."""
        self._attr_native_value = self.coordinator.data[self.data_key]
        self.async_write_ha_state()

