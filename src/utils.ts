import { SensorName, DangerLevel, HassEntities } from './types';
import { t } from './i18n';
import { HomeAssistant } from 'custom-card-helpers';

/**
 * AQI to the Danger Level
 * @param aqi
 */
export function aqiToDangerLevel(aqi: number): DangerLevel {
  if (aqi > 500) {
    return DangerLevel.SEVENTH;
  }
  if (aqi > 300) {
    return DangerLevel.SIXTH;
  }
  if (aqi > 200) {
    return DangerLevel.FIFTH;
  }
  if (aqi > 150) {
    return DangerLevel.FOURTH;
  }
  if (aqi > 100) {
    return DangerLevel.THIRD;
  }
  if (aqi > 50) {
    return DangerLevel.SECOND;
  }
  return DangerLevel.FIRST;
}

/**
 * Get the icon of the danger level
 * @param level
 */
export function getIconOfDangerLevel(level: DangerLevel): string {
  switch (level) {
    case DangerLevel.FIRST:
      return '/air-quality/level-good.svg';
    case DangerLevel.SECOND:
      return '/air-quality/level-moderate.svg';
    case DangerLevel.THIRD:
      return '/air-quality/level-increased.svg';
    case DangerLevel.FOURTH:
      return '/air-quality/level-high.svg';
    case DangerLevel.FIFTH:
      return '/air-quality/level-very-high.svg';
    case DangerLevel.SIXTH:
      return '/air-quality/level-very-high.svg';
    case DangerLevel.SEVENTH:
      return '/air-quality/level-very-high.svg';
  }
}

/**
 * Returns map of sensor name and entity ID
 * @param hass
 */
export function getEntitiesIds(hass: HomeAssistant & { entities: HassEntities }): Map<SensorName, string> {
  const ids = Object.keys(hass.entities).filter(id => hass.entities[id].platform === 'air_quality');
  if (ids.length !== 7) {
    throw new Error(t('error.invalid_sensors_count'));
  }
  const entitiesIds = new Map<SensorName, string>();

  const aqiEntityId = ids.find(id => /^sensor\.air_quality_aqi_?(?<!instant)$/.test(id));
  if (!aqiEntityId) throw new Error(t('error.invalid_sensor', 'sensorName', 'sensor.air_quality_aqi'));
  entitiesIds.set('aqi', aqiEntityId);

  const aqiInstantEntityId = ids.find(id => id.startsWith('sensor.air_quality_aqi_instant'));
  if (!aqiInstantEntityId) throw new Error(t('error.invalid_sensor', 'sensorName', 'sensor.air_quality_aqi_instant'));
  entitiesIds.set('aqi_instant', aqiInstantEntityId);

  const pm25EntityId = ids.find(id => id.startsWith('sensor.air_quality_pm_2_5'));
  if (!pm25EntityId) throw new Error(t('error.invalid_sensor', 'sensorName', 'sensor.air_quality_pm_2_5'));
  entitiesIds.set('pm_2_5', pm25EntityId);

  const pm10EntityId = ids.find(id => id.startsWith('sensor.air_quality_pm_10'));
  if (!pm10EntityId) throw new Error(t('error.invalid_sensor', 'sensorName', 'sensor.air_quality_pm_10'));
  entitiesIds.set('pm_10', pm10EntityId);

  const temperatureEntityId = ids.find(id => id.startsWith('sensor.air_quality_temperature'));
  if (!temperatureEntityId) throw new Error(t('error.invalid_sensor', 'sensorName', 'sensor.air_quality_temperature'));
  entitiesIds.set('temperature', temperatureEntityId);

  const humidityEntityId = ids.find(id => id.startsWith('sensor.air_quality_humidity'));
  if (!humidityEntityId) throw new Error(t('error.invalid_sensor', 'sensorName', 'sensor.air_quality_humidity'));
  entitiesIds.set('humidity', humidityEntityId);

  const pressureEntityId = ids.find(id => id.startsWith('sensor.air_quality_pressure'));
  if (!pressureEntityId) throw new Error(t('error.invalid_sensor', 'sensorName', 'sensor.air_quality_pressure'));
  entitiesIds.set('pressure', pressureEntityId);

  return entitiesIds;
}
