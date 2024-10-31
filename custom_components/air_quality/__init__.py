"""The Air Quality Sensors integration."""
from __future__ import annotations

import logging

from homeassistant.components.frontend import add_extra_js_url, remove_extra_js_url
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import SOURCE_IMPORT, ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant
from homeassistant.helpers.typing import ConfigType


from .const import (
    DOMAIN,
    BASE_URL,
)
from .coordinator import AirQualityCoordinator

LOGGER = logging.getLogger(__name__)


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Track the state of the Air Quality sensors."""

    # Async init entry
    hass.async_create_task(
        hass.config_entries.flow.async_init(
            DOMAIN,
            context={"source": SOURCE_IMPORT},
            data=config,
        )
    )
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up from a config entry."""

    """Register static paths"""
    LOGGER.info("Register paths: %s", f"{BASE_URL}")
    LOGGER.info("Register paths: %s", f"{BASE_URL}/air-quality.js")

    integration_dir = hass.config.path(f"custom_components/{DOMAIN}")
    await hass.http.async_register_static_paths([
        StaticPathConfig(f"{BASE_URL}", f"{integration_dir}/lovelace", cache_headers=False),
        StaticPathConfig(f"{BASE_URL}/air-quality.js", f"{integration_dir}/lovelace/air-quality.js",
                         cache_headers=False),
    ])

    add_extra_js_url(hass, f"{BASE_URL}/air-quality.js", es5=False)

    """Create"""
    _coordinator = AirQualityCoordinator(hass, entry.entry_id)
    await _coordinator.async_config_entry_first_refresh()

    hass.data.setdefault(DOMAIN, {})[entry.entry_id] = _coordinator

    await hass.config_entries.async_forward_entry_setups(entry, [Platform.SENSOR])

    entry.async_on_unload(entry.add_update_listener(async_update_options))

    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    remove_extra_js_url(hass, f"{BASE_URL}/air-quality.js", es5=False)

    unload_ok = await hass.config_entries.async_unload_platforms(entry, [Platform.SENSOR])
    if unload_ok:
        LOGGER.info("Unload successful")
        hass.data[DOMAIN].pop(entry.entry_id)
    return unload_ok


async def async_update_options(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Update options."""
    await hass.config_entries.async_reload(entry.entry_id)