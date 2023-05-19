import { TemplateResult, LitElement, PropertyValues, css, html } from 'lit';
import { AirQualityCardConfig, HomeAssistant, LovelaceCard, LovelaceCardEditor, SensorName } from './types';
import { t } from './i18n';
import { aqiToDangerLevel, getEntitiesIds, getIconOfDangerLevel, getLovelace, fireEvent } from './utils';
import { styles } from './air-quality-card-styles';

declare global {
  interface HTMLElementTagNameMap {
    'air-quality-card': AirQualityCard;
  }
}

export class AirQualityCard extends LitElement implements LovelaceCard {
  /**
   * Hass instance
   */
  public hass!: HomeAssistant;
  /**
   * Card configuration
   * @private
   */
  private config!: AirQualityCardConfig;
  /**
   * Store sensor state
   * @private
   */
  private _states = new Map<SensorName, string>();
  /**
   * The key/value map for computing entity ID (value) by sensor name (key)
   * @private
   */
  private _entitiesIds?: Map<SensorName, string>;
  /**
   * If error is defined card displays error message
   * @private
   */
  private _errorMessage?: string;

  static get styles() {
    return styles(css);
  }

  static get properties() {
    return {
      hass: {},
      config: {},
    };
  }

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import('./air-quality-config');
    return document.createElement('air-quality-config') as LovelaceCardEditor;
  }

  public static getStubConfig(): Omit<AirQualityCardConfig, 'type'> {
    return {
      aqi_type: 'daily',
      enable_recommendation: true,
      display_first_recommendation: false,
    };
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
    if (!this.config || !this.hass) {
      return false;
    }

    if (!this._entitiesIds) {
      try {
        this._entitiesIds = getEntitiesIds(this.hass);
      } catch (e) {
        this._errorMessage = e.message;
        return true;
      }
    }

    let shouldUpdate = false;

    if (changedProps.has('hass')) {
      for (const sensorName of this._entitiesIds.keys()) {
        const entityId = this._entitiesIds.get(sensorName)!;
        const state = this.hass.states[entityId]?.state;
        if (this._states.get(sensorName) !== state) {
          this._states.set(sensorName, state);
          shouldUpdate = true;
        }
      }
    }

    if (changedProps.has('config')) {
      shouldUpdate = true;
    }

    return shouldUpdate;
  }

  override render(): TemplateResult {
    if (this._errorMessage) {
      return html`
        <ha-card>
          <div class="error-card">
            <div class="title">
              <span>${t('error.title')}</span>
            </div>
            <div class="icon">
              <img src="/air-quality/broken.svg" alt="Error" />
            </div>
            <div class="message">${this._errorMessage}</div>
          </div>
        </ha-card>
      `;
    }

    const aqi = this._getState('aqi');
    if (aqi === undefined) {
      return html`
        <ha-card>
          <div class="loading">
            <ha-circular-progress active></ha-circular-progress>
          </div>
        </ha-card>
      `;
    }

    return html`
      <ha-card>
        ${this._renderHeaderBlock(aqi)}
        <slot name="header"></slot>
        ${this._renderEntitiesBlock()}
        <slot name="entities"></slot>
        ${this._renderRecommendationBlock(aqi)}
        <slot></slot>
      </ha-card>
    `;
  }

  private _renderHeaderBlock(aqi: number): TemplateResult | void {
    const dangerLevel = aqiToDangerLevel(aqi);

    return html`
      <button type="button" class="aqi-btn-content" @click="${() => this._displayDetailEntityInfo('aqi')}">
        <div class="image">
          <img src="${getIconOfDangerLevel(dangerLevel)}" alt="AQI Level Icon" width="50" height="50" />
        </div>
        <div class="info">
          <div class="title">${t(`aqi_levels.${dangerLevel}.label`)}</div>
          <div class="aqi-state">${this.config.aqi_type === 'daily' ? t('air_quality_index') : t('air_quality_index_instant')}: <b>${aqi}</b></div>
        </div>
      </button>
    `;
  }

  private _renderEntitiesBlock(): TemplateResult | void {
    return html`
      <div class="readings">
        <button type="button" class="sensor-btn" @click=${() => this._displayDetailEntityInfo('pm_2_5')}>
          <div class="label">PM<sub>2.5</sub></div>
          <div class="icon">
            <img src="/air-quality/pm-2-5.svg" alt="PM2.5" />
          </div>
          <div class="value">${this._getState('pm_2_5') ?? ''} µg/m³</div>
        </button>
        <button type="button" class="sensor-btn" @click=${() => this._displayDetailEntityInfo('pm_10')}>
          <div class="label">PM<sub>10</sub></div>
          <div class="icon">
            <img src="/air-quality/pm-10.svg" alt="PM10" />
          </div>
          <div class="value">${this._getState('pm_10') ?? ''} µg/m³</div>
        </button>
        <button type="button" class="sensor-btn" @click=${() => this._displayDetailEntityInfo('temperature')}>
          <div class="label">Temperature</div>
          <div class="icon">
            <img src="/air-quality/temperature.svg" alt="Temperature" />
          </div>
          <div class="value">${this._getState('temperature') ?? ''} °C</div>
        </button>
        <button type="button" class="sensor-btn" @click=${() => this._displayDetailEntityInfo('humidity')}>
          <div class="label">Humidity</div>
          <div class="icon">
            <img src="/air-quality/humidity.svg" alt="Humidity" />
          </div>
          <div class="value">${this._getState('humidity') ?? ''} %</div>
        </button>
        <button type="button" class="sensor-btn" @click=${() => this._displayDetailEntityInfo('pressure')}>
          <div class="label">Pressure</div>
          <div class="icon">
            <img src="/air-quality/pressure.svg" alt="Pressure" />
          </div>
          <div class="value">${this._getState('pressure')?.toFixed(0) ?? ''} mmHg</div>
        </button>
      </div>
    `;
  }

  private _renderRecommendationBlock(aqi: number): TemplateResult | void {
    if (!this.config?.enable_recommendation) {
      return;
    }
    const displayFrom = this.config?.display_first_recommendation ? 0 : 1;
    const aqiLevel = aqiToDangerLevel(aqi);
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
   * Returns entity ID by sensor name
   * @param name
   * @private
   */
  private _getEntityId(name: SensorName): string | undefined {
    if (!this._entitiesIds) {
      return undefined;
    }

    if (name === 'aqi') {
      return this.config?.aqi_type === 'daily' ? this._entitiesIds.get('aqi')! : this._entitiesIds.get('aqi_instant')!;
    } else {
      return this._entitiesIds.get(name)!;
    }
  }

  /**
   * Returns sensor state, by sensor name
   * @param name
   * @private
   */
  private _getState(name: SensorName): number | undefined {
    const stateRaw = this._states.get(name);
    if (!stateRaw || stateRaw === 'unknown') {
      return undefined;
    }
    const state = Number(stateRaw);
    return isNaN(state) ? undefined : state;
  }

  /**
   * Open detail info modal
   * @param sensor
   * @private
   */
  private _displayDetailEntityInfo(sensor: SensorName): void {
    const entityId = this._getEntityId(sensor);
    if (!entityId) {
      return;
    }
    fireEvent(this, 'hass-more-info', { entityId });
  }
}

(window as any).customElements.define('air-quality-card', AirQualityCard);

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
