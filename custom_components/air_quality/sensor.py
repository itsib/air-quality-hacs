"""Sensor platform for the Air Quality integration."""
from __future__ import annotations

from datetime import date, datetime
from decimal import Decimal
from functools import cached_property

from homeassistant.components.flo.const import LOGGER
from homeassistant.components.sensor import (
    DOMAIN as SENSOR_DOMAIN,
    RestoreSensor,
)
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.typing import StateType
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import DOMAIN, ATTRIBUTION
from .coordinator import AirQualityCoordinator
from .utils.converters import get_device_class, get_unit_of_measurement, get_entity_category, get_state_class
from .utils.entity_keys import SENSORS

ENTITY_ID_SENSOR_FORMAT = SENSOR_DOMAIN + ".air_quality_{}"


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback) -> None:
    """Set up Sun sensor platform."""
    coordinator: AirQualityCoordinator = hass.data[DOMAIN][entry.entry_id]

    # Add main air sensors to home assistant
    async_add_entities(
        [AirQualitySensor(entry.entry_id, data_key, coordinator) for data_key in SENSORS],
        update_before_add=True,
    )


class AirQualitySensor(CoordinatorEntity, RestoreSensor):
    """Representation of a Sun Sensor."""
    entity_key: str
    coordinator: AirQualityCoordinator

    _attr_assumed_state = True
    _attr_has_entity_name = True
    _attr_attribution = ATTRIBUTION

    def __init__(self, entry_id: str, entity_key: str, coordinator: AirQualityCoordinator) -> None:
        """Initiate air quality Sensor."""

        self.entity_key = entity_key
        self.entity_id = ENTITY_ID_SENSOR_FORMAT.format(self.entity_key)
        self.coordinator = coordinator

        self._attr_translation_key = entity_key
        self._attr_unique_id = f"{entry_id}_{entity_key}"
        self._attr_device_class = get_device_class(entity_key)
        self._attr_native_unit_of_measurement = get_unit_of_measurement(entity_key)
        self._attr_device_info = self.coordinator.device
        self._attr_entity_category = get_entity_category(entity_key)
        self._attr_state_class = get_state_class(entity_key)

        LOGGER.debug("Sensor config %s", self)

        super().__init__(coordinator, context=entity_key)

    @callback
    def _handle_coordinator_update(self) -> None:
        """Handle updated data from the coordinator."""
        value = self.coordinator.data[self.entity_key]

        sign = self._attr_native_unit_of_measurement
        LOGGER.info(f"entity_key {self.entity_key}: {'' if value is None else str(value)} {'' if sign is None else sign}")

        if value is not None:
            self._attr_native_value = value

        self.async_write_ha_state()

    @cached_property
    def native_value(self) -> StateType | date | datetime | Decimal:
        """Return the value reported by the sensor."""
        value = self.coordinator.data[self.entity_key]
        if value is not None:
            self._attr_native_value = value

        return self._attr_native_value

    # @cached_property
    # def suggested_unit_of_measurement(self) -> str | None:
    #     return get_unit_of_measurement(self.entity_key)

