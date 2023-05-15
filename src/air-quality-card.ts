import { css, html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hasConfigOrEntityChanged, HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import { AirQualityCardConfig, AirQualitySensors, HassEntities } from './types';
import { t } from './i18n';
import { getAqiLevel, getAqiLevelIconUrl } from './utils';

@customElement('air-quality-card')
export class AirQualityCard extends LitElement {
  @state()
  private config!: AirQualityCardConfig;

  @property({ attribute: false })
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

      .content {
        height: 64px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }

      .content .image {
        min-width: 64px;
        margin-right: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .content .info {
        margin-right: auto;
      }

      .content .info .title {
        color: var(--ha-card-header-color, --primary-text-color);
        font-family: var(--ha-card-header-font-family, inherit);
        font-size: var(--ha-card-header-font-size, 20px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 1.2;
      }

      .content .info .aqi-state {
        margin-top: 6px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: var(--secondary-text-color);
        font-size: 14px;
        line-height: 1;
      }

      .content .info .aqi-state b {
        color: var(--primary-text-color);
        font-weight: 500;
      }

      .readings {
        margin-top: 26px;
        margin-bottom: 16px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
      }

      .readings .sensor {
        width: 78px;
        text-align: center;
      }

      .readings .sensor .label {
        margin-bottom: 8px;
        color: var(--secondary-text-color);
        font-size: 13px;
        font-weight: 400;
      }

      .readings .sensor .icon img {
        width: 40px;
        height: 40px;
      }

      .readings .sensor .value {
        margin-top: 8px;
        font-size: 13px;
      }

      .recommendation {
        margin-top: 26px;
      }

      .recommendation .title {
        margin-bottom: 10px;
        color: var(--primary-text-color);
        font-size: 16px;
        font-weight: normal;
      }

      .recommendation .paragraph {
        color: var(--secondary-text-color);
      }
    `;

    // const levelStyle = css`
    //   .environment-card-level {
    //     display: flex;
    //     flex-direction: column;
    //     align-items: center;
    //   }
    //
    //   .environment-card-level-face {
    //     width: 82px;
    //     height: 82px;
    //     padding: 6px;
    //     border-radius: 50%;
    //     box-sizing: border-box;
    //   }
    //
    //   .environment-card-level-label {
    //     margin-top: 10px;
    //     padding: 0 6px;
    //     text-align: center;
    //     color: var(--primary-text-color);
    //     font-size: 12px;
    //     border-radius: 4px;
    //   }
    // `;
    //
    // const infoStyle = css`
    //   .environment-card-info {
    //     padding-left: 16px;
    //     flex-grow: 1;
    //   }
    //
    //   .environment-card-info-entities {
    //     list-style: none;
    //     margin: 0;
    //     padding: 0;
    //   }
    //
    //   .environment-card-info-entity {
    //     margin: 6px 0;
    //     color: var(--primary-text-color);
    //     display: flex;
    //     align-items: center;
    //   }
    //
    //   .environment-card-info-entity:first-child {
    //     margin-top: 0;
    //   }
    //
    //   .environment-card-info-entity .icon {
    //     color: var(--paper-item-icon-color, #44739e);
    //   }
    //
    //   .environment-card-info-entity .name {
    //     margin-left: 16px;
    //     margin-right: 8px;
    //     white-space: nowrap;
    //     overflow: hidden;
    //     text-overflow: ellipsis;
    //     flex: 1 1 30%;
    //   }
    // `;
    //
    // const footerStyle = css`
    //   .card-footer {
    //     padding: 0 16px 16px;
    //   }
    //
    //   .card-footer .sub-title {
    //     margin-top: 6px;
    //     margin-bottom: 10px;
    //     color: var(--primary-text-color);
    //     font-weight: normal;
    //   }
    //
    //   .card-footer .recommendation {
    //     color: var(--secondary-text-color);
    //   }
    // `;
    // return [containerStyle, levelStyle, infoStyle, footerStyle];
  }

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import('./configurator');
    return document.createElement('air-quality-card-configurator') as LovelaceCardEditor;
  }

  public static getStubConfig(): Record<string, unknown> {
    return {
      name: 'Air Quality',
      aqi_type: 'daily',
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
    `;
  }

  setConfig(config?: AirQualityCardConfig): void {
    if (!config) {
      throw new Error(t('invalid_configuration'));
    }
    this.config = {
      aqi_type: 'daily',
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

  private _renderAqiBlock(): TemplateResult {
    const aqi = this._getState('aqi');
    if (!aqi) {
      return html``;
    }
    const aqiLevel = getAqiLevel(aqi);

    return html`
      <div class="content">
        <div class="image">
          <img src="${getAqiLevelIconUrl(aqiLevel)}" alt="AQI Level Icon" width="50" height="50" />
        </div>
        <div class="info">
          <div class="title">${t(`aqi_levels.${aqiLevel}.label`)}</div>
          <div class="aqi-state">${this.config.aqi_type === 'daily' ? t('air_quality_index') : t('air_quality_index_instant')}: <b>${aqi}</b></div>
        </div>
      </div>
    `;
  }

  private _renderReadingBlock(): TemplateResult {
    return html`
      <div class="readings">
        <div class="sensor">
          <div class="label">PM<sub>2.5</sub></div>
          <div class="icon">
            <img src="/air-quality/pm-2-5.svg" alt="PM2.5" />
          </div>
          <div class="value">${this._getState('pm_2_5') ?? ''} µg/m³</div>
        </div>
        <div class="sensor">
          <div class="label">PM<sub>10</sub></div>
          <div class="icon">
            <img src="/air-quality/pm-10.svg" alt="PM10" />
          </div>
          <div class="value">${this._getState('pm_10') ?? ''} µg/m³</div>
        </div>
        <div class="sensor">
          <div class="label">Temperature</div>
          <div class="icon">
            <img src="/air-quality/temperature.svg" alt="Temperature" />
          </div>
          <div class="value">${this._getState('temperature') ?? ''} °C</div>
        </div>
        <div class="sensor">
          <div class="label">Humidity</div>
          <div class="icon">
            <img src="/air-quality/humidity.svg" alt="Humidity" />
          </div>
          <div class="value">${this._getState('humidity') ?? ''} %</div>
        </div>
        <div class="sensor">
          <div class="label">Pressure</div>
          <div class="icon">
            <img src="/air-quality/pressure.svg" alt="Pressure" />
          </div>
          <div class="value">${this._getState('pressure')?.toFixed(0) ?? ''} mmHg</div>
        </div>
      </div>
    `;
  }

  private _renderRecommendationBlock(): TemplateResult {
    const aqi = this._getState('aqi');
    if (!aqi) {
      return html``;
    }
    const aqiLevel = getAqiLevel(aqi);
    if (aqiLevel <= 1) {
      return html``;
    }

    return html`
      <div class="recommendation">
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
      throw new Error(t('invalid_sensors_count'));
    }

    const aqiSensorId = ids.find(id => /^sensor\.air_quality_aqi_?(?<!instant)$/.test(id));
    if (!aqiSensorId) throw new Error(t('invalid_sensor', '{sensorName}', 'sensor.air_quality_aqi'));

    const aqiInstantSensorId = ids.find(id => id.startsWith('sensor.air_quality_aqi_instant'));
    if (!aqiInstantSensorId) throw new Error(t('invalid_sensor', '{sensorName}', 'sensor.air_quality_aqi_instant'));

    const pm25SensorId = ids.find(id => id.startsWith('sensor.air_quality_pm_2_5'));
    if (!pm25SensorId) throw new Error(t('invalid_sensor', '{sensorName}', 'sensor.air_quality_pm_2_5'));

    const pm10SensorId = ids.find(id => id.startsWith('sensor.air_quality_pm_10'));
    if (!pm10SensorId) throw new Error(t('invalid_sensor', '{sensorName}', 'sensor.air_quality_pm_10'));

    const temperatureSensorId = ids.find(id => id.startsWith('sensor.air_quality_temperature'));
    if (!temperatureSensorId) throw new Error(t('invalid_sensor', '{sensorName}', 'sensor.air_quality_temperature'));

    const humiditySensorId = ids.find(id => id.startsWith('sensor.air_quality_humidity'));
    if (!humiditySensorId) throw new Error(t('invalid_sensor', '{sensorName}', 'sensor.air_quality_humidity'));

    const pressureSensorId = ids.find(id => id.startsWith('sensor.air_quality_pressure'));
    if (!pressureSensorId) throw new Error(t('invalid_sensor', '{sensorName}', 'sensor.air_quality_pressure'));

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

  /**
   * Returns entity state, by sensor name
   * @param sensor
   * @private
   */
  private _getState(sensor: keyof AirQualitySensors): number | undefined {
    if (!this._sensors) {
      return undefined;
    }

    let entityId: string;
    if (sensor === 'aqi') {
      entityId = this.config?.aqi_type === 'daily' ? this._sensors?.aqi : this._sensors?.aqi_instant;
    } else {
      entityId = this._sensors[sensor];
    }

    if (!entityId || !(entityId in this._hass.states)) {
      return undefined;
    }

    const state = Number(this._hass.states[entityId].state);
    return isNaN(state) ? undefined : state;
  }
}

// Puts card into the UI card picker dialog
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'air-quality-card',
  name: 'Air Quality Card',
  description: 'Displays the readings of the weather station sensors. Provided by Air Quality integration.',
  // supported: supportsButtonPressTileFeature, // Optional
  preview: true,
  configurable: true, // Optional - defaults to false
});
