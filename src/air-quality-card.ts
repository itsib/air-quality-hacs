import { css, html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { fireEvent, getLovelace, hasConfigOrEntityChanged, HomeAssistant, LovelaceCard, LovelaceCardEditor } from 'custom-card-helpers';
import { AirQualityCardConfig, AirQualitySensors, HassEntities } from './types';
import { t } from './i18n';
import { getAqiLevel, getAqiLevelIconUrl } from './utils';

@customElement('air-quality-card')
export class AirQualityCard extends LitElement implements LovelaceCard {
  @state()
  private config!: AirQualityCardConfig;

  private _hass!: HomeAssistant & { entities: HassEntities };

  private _sensors?: AirQualitySensors;

  static override get styles() {
    return css`
      :host {
        font-family: var(--paper-font-body1_-_font-family);
        -webkit-font-smoothing: var(--paper-font-body1_-_-webkit-font-smoothing);
        font-size: var(--paper-font-body1_-_font-size);
        font-weight: var(--paper-font-body1_-_font-weight);
        line-height: var(--paper-font-body1_-_line-height);
        color: var(--primary-text-color);
      }

      ha-card {
        padding: 16px;
      }

      .aqi-btn-content {
        height: 64px;
        width: 100%;
        text-align: left;
        cursor: pointer;
        border: none;
        outline: none;
        background: transparent;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }

      .aqi-btn-content .image {
        min-width: 64px;
        margin-right: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .aqi-btn-content .info {
        margin-right: auto;
      }

      .aqi-btn-content .info .title {
        color: var(--ha-card-header-color, --primary-text-color);
        font-family: var(--ha-card-header-font-family, inherit);
        font-size: var(--ha-card-header-font-size, 20px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 1.2;
      }

      .aqi-btn-content .info .aqi-state {
        margin-top: 6px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: var(--secondary-text-color);
        font-size: 14px;
        line-height: 1;
      }

      .aqi-btn-content .info .aqi-state b {
        color: var(--primary-text-color);
        font-weight: 500;
      }

      .readings {
        margin: 16px -10px;
        display: flex;
        flex-direction: row;
        align-items: stretch;
        justify-content: space-around;
      }

      .readings .sensor-btn {
        width: 78px;
        padding: 0;
        cursor: pointer;
        border: none;
        outline: none;
        background: transparent;
        text-align: center;
        display: block;
      }

      .readings .sensor-btn .label {
        height: 20px;
        margin-bottom: 6px;
        color: var(--secondary-text-color);
        font-size: 13px;
        font-weight: 400;
        line-height: 20px;
        white-space: nowrap;
      }

      .readings .sensor-btn .icon img {
        width: 40px;
        height: 40px;
      }

      .readings .sensor-btn .value {
        height: 20px;
        margin-top: 6px;
        font-size: 13px;
        line-height: 20px;
        white-space: nowrap;
      }

      .recommendation {
        padding-top: 1px;
      }

      .recommendation .title {
        margin: 14px 0 4px;
        color: var(--primary-text-color);
        font-size: 16px;
        font-weight: normal;
      }

      .recommendation .paragraph {
        color: var(--secondary-text-color);
      }
    `;
  }

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import('./configurator');
    return document.createElement('air-quality-card-configurator') as LovelaceCardEditor;
  }

  public static getStubConfig(): Record<string, unknown> {
    return {
      aqi_type: 'daily',
      enable_recommendation: true,
      display_first_recommendation: false,
    };
  }

  override render(): TemplateResult {
    return html`
      <ha-card>
        ${this._renderAqiBlock()}
        <span></span>
        ${this._renderReadingBlock()}
        <span></span>
        ${this._renderRecommendationBlock()}
      </ha-card>
      <portal></portal>
    `;
  }

  setConfig(config?: AirQualityCardConfig): void {
    if (!config) {
      throw new Error(t('error.invalid_configuration'));
    }

    if (config.test_gui) {
      getLovelace().setEditMode(true);
    }

    this.config = {
      aqi_type: 'daily',
      enable_recommendation: true,
      display_first_recommendation: false,
      ...config,
    };
  }

  getCardSize(): number {
    return 3;
  }

  shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this.config) {
      return false;
    }

    return hasConfigOrEntityChanged(this, changedProps, false);
  }

  @property({ attribute: false })
  set hass(hass: HomeAssistant & { entities: HassEntities }) {
    this._hass = hass;

    if (!this._sensors) {
      this._validateAndFillSensors();
    }
  }

  private _renderAqiBlock(): TemplateResult | void {
    const aqi = this._getState('aqi');
    if (!aqi) {
      return;
    }
    const aqiLevel = getAqiLevel(aqi);

    return html`
      <button type="button" class="aqi-btn-content" @click=${() => this._detailInfo('aqi')}>
        <div class="image">
          <img src="${getAqiLevelIconUrl(aqiLevel)}" alt="AQI Level Icon" width="50" height="50" />
        </div>
        <div class="info">
          <div class="title">${t(`aqi_levels.${aqiLevel}.label`)}</div>
          <div class="aqi-state">${this.config.aqi_type === 'daily' ? t('air_quality_index') : t('air_quality_index_instant')}: <b>${aqi}</b></div>
        </div>
      </button>
    `;
  }

  private _renderReadingBlock(): TemplateResult | void {
    return html`
      <div class="readings">
        <button type="button" class="sensor-btn" @click=${() => this._detailInfo('pm_2_5')}>
          <div class="label">PM<sub>2.5</sub></div>
          <div class="icon">
            <img src="/air-quality/pm-2-5.svg" alt="PM2.5" />
          </div>
          <div class="value">${this._getState('pm_2_5') ?? ''} µg/m³</div>
        </button>
        <button type="button" class="sensor-btn" @click=${() => this._detailInfo('pm_10')}>
          <div class="label">PM<sub>10</sub></div>
          <div class="icon">
            <img src="/air-quality/pm-10.svg" alt="PM10" />
          </div>
          <div class="value">${this._getState('pm_10') ?? ''} µg/m³</div>
        </button>
        <button type="button" class="sensor-btn" @click=${() => this._detailInfo('temperature')}>
          <div class="label">Temperature</div>
          <div class="icon">
            <img src="/air-quality/temperature.svg" alt="Temperature" />
          </div>
          <div class="value">${this._getState('temperature') ?? ''} °C</div>
        </button>
        <button type="button" class="sensor-btn" @click=${() => this._detailInfo('humidity')}>
          <div class="label">Humidity</div>
          <div class="icon">
            <img src="/air-quality/humidity.svg" alt="Humidity" />
          </div>
          <div class="value">${this._getState('humidity') ?? ''} %</div>
        </button>
        <button type="button" class="sensor-btn" @click=${() => this._detailInfo('pressure')}>
          <div class="label">Pressure</div>
          <div class="icon">
            <img src="/air-quality/pressure.svg" alt="Pressure" />
          </div>
          <div class="value">${this._getState('pressure')?.toFixed(0) ?? ''} mmHg</div>
        </button>
      </div>
    `;
  }

  private _renderRecommendationBlock(): TemplateResult | void {
    if (!this.config?.enable_recommendation) {
      return;
    }
    const aqi = this._getState('aqi');
    if (!aqi) {
      return;
    }
    const displayFrom = this.config?.display_first_recommendation ? 0 : 1;
    const aqiLevel = getAqiLevel(aqi);
    if (aqiLevel <= displayFrom) {
      return;
    }

    return html`
      <div class="recommendation">
        <div class="title">${t('health_effects')}</div>
        <div class="paragraph">${t(`aqi_levels.${aqiLevel}.effects`)}</div>
        <div class="title">${t('recommendation')}</div>
        <div class="paragraph">${t(`aqi_levels.${aqiLevel}.recommendation`)}</div>
      </div>
    `;
  }

  /**
   * We check the number and existence of sensors
   * @private
   */
  private _validateAndFillSensors(): void {
    const ids = Object.keys(this._hass.entities).filter(id => this._hass.entities[id].platform === 'air_quality');
    if (ids.length !== 7) {
      throw new Error(t('error.invalid_sensors_count'));
    }

    const aqiSensorId = ids.find(id => /^sensor\.air_quality_aqi_?(?<!instant)$/.test(id));
    if (!aqiSensorId) throw new Error(t('error.invalid_sensor', 'sensorName', 'sensor.air_quality_aqi'));

    const aqiInstantSensorId = ids.find(id => id.startsWith('sensor.air_quality_aqi_instant'));
    if (!aqiInstantSensorId) throw new Error(t('error.invalid_sensor', 'sensorName', 'sensor.air_quality_aqi_instant'));

    const pm25SensorId = ids.find(id => id.startsWith('sensor.air_quality_pm_2_5'));
    if (!pm25SensorId) throw new Error(t('error.invalid_sensor', 'sensorName', 'sensor.air_quality_pm_2_5'));

    const pm10SensorId = ids.find(id => id.startsWith('sensor.air_quality_pm_10'));
    if (!pm10SensorId) throw new Error(t('error.invalid_sensor', 'sensorName', 'sensor.air_quality_pm_10'));

    const temperatureSensorId = ids.find(id => id.startsWith('sensor.air_quality_temperature'));
    if (!temperatureSensorId) throw new Error(t('error.invalid_sensor', 'sensorName', 'sensor.air_quality_temperature'));

    const humiditySensorId = ids.find(id => id.startsWith('sensor.air_quality_humidity'));
    if (!humiditySensorId) throw new Error(t('error.invalid_sensor', 'sensorName', 'sensor.air_quality_humidity'));

    const pressureSensorId = ids.find(id => id.startsWith('sensor.air_quality_pressure'));
    if (!pressureSensorId) throw new Error(t('error.invalid_sensor', 'sensorName', 'sensor.air_quality_pressure'));

    this._sensors = {
      aqi: aqiSensorId,
      aqi_instant: aqiInstantSensorId,
      pm_2_5: pm25SensorId,
      pm_10: pm10SensorId,
      temperature: temperatureSensorId,
      humidity: humiditySensorId,
      pressure: pressureSensorId,
    };
  }

  private _sensorToEntityId(sensor: string): string | undefined {
    if (!this._sensors) {
      return undefined;
    }

    if (sensor === 'aqi') {
      return this.config?.aqi_type === 'daily' ? this._sensors?.aqi : this._sensors?.aqi_instant;
    } else {
      return this._sensors[sensor];
    }
  }

  /**
   * Returns entity state, by sensor name
   * @param sensor
   * @private
   */
  private _getState(sensor: keyof AirQualitySensors): number | undefined {
    const entityId = this._sensorToEntityId(sensor);
    if (!entityId || !(entityId in this._hass.states)) {
      return undefined;
    }

    const state = Number(this._hass.states[entityId].state);
    return isNaN(state) ? undefined : state;
  }

  /**
   * Open detail info modal
   * @param sensor
   * @private
   */
  private _detailInfo(sensor: string): void {
    const entityId = this._sensorToEntityId(sensor);
    if (!entityId) {
      return;
    }
    fireEvent(this, 'hass-more-info', { entityId });
  }
}

// Puts card into the UI card picker dialog
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'air-quality-card',
  name: t('card_name'),
  description: 'Displays the readings of the weather station sensors. Provided by Air Quality integration.',
  // supported: supportsButtonPressTileFeature, // Optional
  preview: true,
  configurable: true, // Optional - defaults to false
});
