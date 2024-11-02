import unittest

from homeassistant.components.sensor import SensorDeviceClass
from .converters import get_device_class, get_unit_of_measurement
from .extract import parse_date, extract_timestamp, extract_value, sort_dataset
from .entity_keys import EntityKey

class TestUtilsLib(unittest.TestCase):
    def test_get_device_class(self):
        self.assertEqual(get_device_class(EntityKey.AQI), SensorDeviceClass.AQI)
        self.assertEqual(get_device_class(EntityKey.AQI_INSTANT), SensorDeviceClass.AQI)
        self.assertEqual(get_device_class(EntityKey.PM_2_5), SensorDeviceClass.PM25)
        self.assertEqual(get_device_class(EntityKey.PM_10), SensorDeviceClass.PM10)
        self.assertEqual(get_device_class(EntityKey.TEMPERATURE), SensorDeviceClass.TEMPERATURE)
        self.assertEqual(get_device_class(EntityKey.HUMIDITY), SensorDeviceClass.HUMIDITY)
        self.assertEqual(get_device_class(EntityKey.PRESSURE), SensorDeviceClass.ATMOSPHERIC_PRESSURE)
        self.assertEqual(get_device_class(EntityKey.UPDATED), SensorDeviceClass.DATE)

    def test_get_unit_of_measurement(self):
        self.assertEqual(get_unit_of_measurement(EntityKey.AQI), None)
        self.assertEqual(get_unit_of_measurement(EntityKey.PM_10), "µg/m³")
        self.assertEqual(get_unit_of_measurement(EntityKey.PM_2_5), "µg/m³")
        self.assertEqual(get_unit_of_measurement(EntityKey.TEMPERATURE), "°C")
        self.assertEqual(get_unit_of_measurement(EntityKey.HUMIDITY), "%")
        self.assertEqual(get_unit_of_measurement(EntityKey.PRESSURE), "mmHg")
        self.assertEqual(get_unit_of_measurement(EntityKey.UPDATED), None)

    def test_parse_date(self):
        self.assertEqual(parse_date("2024-10-01 00:00:00"), 1727715600)
        self.assertEqual(parse_date("2024-11-01 09:00:00"), 1730426400)
        self.assertEqual(parse_date("2023-11-01 01:00:00"), 1698775200)
        self.assertEqual(parse_date("2024-10-00 09:00:00"), None)
        self.assertEqual(parse_date("2023-11-01"), None)
        self.assertEqual(parse_date(None), None)

    def test_extract_timestamp(self):
        data = [
            {'time': "2024-11-01 19:00:00"},
            {'time': "2024-11-01 18:00:00"},
        ]
        # Should extract first item date and convert to timestamp
        self.assertEqual(extract_timestamp(data), 1730462400)
        self.assertEqual(extract_timestamp([]), None)
        self.assertEqual(extract_timestamp([{}, {'time': "2024-11-01 18:00:00"}]), None)

    def test_extract_value(self):
        data0 = [
            {'time': "2024-11-01 19:00:00", 'aqi': 33},
            {'time': "2024-11-01 18:00:00", 'aqi': 35},
        ]
        self.assertEqual(extract_value(data0, 'aqi'), 33)
        data1 = [
            {'time': "2024-11-01 19:00:00" },
            {'time': "2024-11-01 18:00:00", 'aqi': 35},
        ]
        self.assertEqual(extract_value(data1, 'aqi'), 35)
        data2 = [{'time': "2024-11-01 18:00:00", 'aqi': 22}]
        self.assertEqual(extract_value(data2, 'aqi'), 22)
        data3 = [{'time': "2024-11-01 18:00:00"}]
        self.assertEqual(extract_value(data3, 'aqi'), None)
        self.assertEqual(extract_value([], 'aqi'), None)

    def test_sort_dataset(self):
        _input = [
            {'time': "2024-11-01 18:00:00", 'aqi': 35},
            {'time': "2024-11-01 17:00:00", 'aqi': 27},
            {'time': "2024-11-01 19:00:00", 'aqi': 31},
        ]
        _output = [
            {'time': "2024-11-01 19:00:00", 'aqi': 31},
            {'time': "2024-11-01 18:00:00", 'aqi': 35},
            {'time': "2024-11-01 17:00:00", 'aqi': 27},
        ]
        # The null element should be the data row with the latest entries
        self.assertListEqual(sort_dataset(_input), _output)

if __name__ == '__main__':
    unittest.main()