from datetime import datetime
from typing import Any
from .entity_keys import EntityKey

def parse_date(raw) -> int | None:
    try:
        _parsed = datetime.strptime(f'{raw} +0700', '%Y-%m-%d %H:%M:%S %z')
        return int(_parsed.timestamp())
    except ValueError:
        return None

def sort_dataset(dataset: list[dict[str, Any]]) -> list[dict[str, Any]]:
    dataset = sorted(dataset, key=lambda d: parse_date(d.get('time')))
    dataset.reverse()
    return dataset

def extract_value(dataset: list[dict[str, Any]], key: str) -> float | None:
    """
    Retrieves the value by key from the array sorted by time field of API data.

    dataset: {
        aqi:        float;
        iaqi:       float;
        pm10:       float;
        pm25:       float;
        pm25_mcp:   float;
        h:          float;
        p:          float;
        t:          float;
        site:       int;
        time:       str;
    }[];
    """
    value: float | None = None
    if len(dataset) >= 1:
        value = dataset[0].get(key, None)

    if value is None and len(dataset) >= 2:
        value = dataset[1].get(key, None)

    # Remove pressure invalid value
    if key == 'p' and value is not None and value < 500:
        return None

    return value

def extract_timestamp(dataset: list[dict[str, Any]]) -> int | None:
    """Extract date from dataset and convert to timestamp"""
    if len(dataset) == 0:
        return None
    _dateStr: str | None = dataset[0].get('time', None)
    if _dateStr is None:
        return None

    try:
        return parse_date(_dateStr)
    except ValueError:
        return None

def format_api_response(dataset: list[dict[str, Any]]) -> dict[EntityKey, float | None] | None:
    """Format result for API call, and compute best readings"""
    dataset = sort_dataset(dataset)

    _aqi = extract_value(dataset, 'aqi')
    _aqi_instant = extract_value(dataset, 'iaqi')
    _pm_10 = extract_value(dataset, 'pm10')
    _pm_2_5 = extract_value(dataset, 'pm25')
    _temperature = extract_value(dataset, 't')
    _humidity = extract_value(dataset, 'h')
    _pressure = extract_value(dataset, 'p')

    if _aqi is None \
            and _aqi_instant is None \
            and _pm_10 is None \
            and _pm_2_5 is None \
            and _temperature is None \
            and _humidity is None \
            and _pressure is None:
        return None

    return {
        EntityKey.AQI: _aqi,
        EntityKey.AQI_INSTANT: _aqi_instant,
        EntityKey.PM_10: _pm_10,
        EntityKey.PM_2_5: _pm_2_5,
        EntityKey.TEMPERATURE: _temperature,
        EntityKey.HUMIDITY: _humidity,
        EntityKey.PRESSURE: _pressure,
    }