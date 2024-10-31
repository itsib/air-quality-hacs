import { SensorName, DangerLevel, HassEntities, HomeAssistant, ValidHassDomEvent } from 'types';
import { t } from 'i18n';

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
      return '/air_quality_files/level-good.svg';
    case DangerLevel.SECOND:
      return '/air_quality_files/level-moderate.svg';
    case DangerLevel.THIRD:
      return '/air_quality_files/level-increased.svg';
    case DangerLevel.FOURTH:
      return '/air_quality_files/level-high.svg';
    case DangerLevel.FIFTH:
      return '/air_quality_files/level-very-high.svg';
    case DangerLevel.SIXTH:
      return '/air_quality_files/level-very-high.svg';
    case DangerLevel.SEVENTH:
      return '/air_quality_files/level-very-high.svg';
  }
}

/**
 * Returns map of sensor name and entity ID
 * @param hass
 */
export function getEntitiesIds(hass: HomeAssistant & { entities: HassEntities }): Map<SensorName, string> {
  const ids = Object.keys(hass.entities).filter(id => hass.entities[id].platform === 'air_quality');
  if (ids.length !== 7) {
    throw new Error(t('error.integration_not_provide_states'));
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

export function getLovelace(): any {
  let root: any = document.querySelector('home-assistant');
  root = root && root.shadowRoot;
  root = root && root.querySelector('home-assistant-main');
  root = root && root.shadowRoot;
  root = root && root.querySelector('app-drawer-layout partial-panel-resolver');
  root = (root && root.shadowRoot) || root;
  root = root && root.querySelector('ha-panel-lovelace');
  root = root && root.shadowRoot;
  root = root && root.querySelector('hui-root');
  if (root) {
    const ll = root.lovelace;
    ll.current_view = root.___curView;
    return ll;
  }
  return null;
}

/**
 * Dispatches a custom event with an optional detail value.
 *
 * @param node
 * @param {string} type Name of event type.
 * @param {*=} detail Detail value containing event-specific
 *   payload.
 * @param options
 *           cancelable: (boolean|undefined),
 *           composed: (boolean|undefined) }=}
 *  options Object specifying options.  These may include:
 *  `bubbles` (boolean, defaults to `true`),
 *  `cancelable` (boolean, defaults to false), and
 *  `node` on which to fire the event (HTMLElement, defaults to `this`).
 * @return {Event} The new event that was fired.
 */
export function fireEvent<HassEvent extends ValidHassDomEvent>(
  node: HTMLElement | Window,
  type: HassEvent,
  detail?: HASSDomEvents[HassEvent],
  options?: {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
  },
) {
  options = options || {};
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  detail = detail === null || detail === undefined ? {} : detail;
  const event = new Event(type, {
    bubbles: options.bubbles === undefined ? true : options.bubbles,
    cancelable: Boolean(options.cancelable),
    composed: options.composed === undefined ? true : options.composed,
  });
  (event as any).detail = detail;
  node.dispatchEvent(event);
  return event;
}
