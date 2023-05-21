import { html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { AirQualityCardConfig, CardSize, HomeAssistant, LovelaceCard, LovelaceCardEditor, SensorName } from './packages/ha-types';
import { t } from './i18n';
import { aqiToDangerLevel, fireEvent, getEntitiesIds, getIconOfDangerLevel, getLovelace } from './utils';
import styles from './air-quality-card.scss';

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
   * Card size (changes after window resize)
   * @private
   */
  private size: CardSize = CardSize.MD;
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
  /**
   * Store window resize callback function, for the remove it.
   * @private
   */
  private _resizeCallback?: () => void;

  static styles = styles;

  static get properties() {
    return {
      hass: {},
      config: { attribute: false },
      size: { state: true, type: String },
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
      return true;
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
        const stateNew = this.hass.states[entityId]?.state;
        const stateOld = this._states.get(sensorName);
        if (stateOld !== stateNew) {
          this._states.set(sensorName, stateNew);
          shouldUpdate = true;
        }
      }
    }

    if (changedProps.has('config') || changedProps.has('size')) {
      shouldUpdate = true;
    }

    return shouldUpdate;
  }

  connectedCallback(): void {
    super.connectedCallback();

    this._handleWindowResize();

    this._resizeCallback = this._handleWindowResize.bind(this);
    window.addEventListener('resize', this._resizeCallback);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    if (this._resizeCallback) {
      window.removeEventListener('resize', this._resizeCallback);
    }
  }

  render(): TemplateResult {
    if (this._errorMessage) {
      return html`
        <ha-card class="${`error-card card-${this.size}`}">
          <div class="title">
            <span>${t('error.title')}</span>
          </div>
          <div class="icon">
            <img src="/air-quality/broken.svg" alt="Error" />
          </div>
          <div class="message">${this._errorMessage}</div>
        </ha-card>
      `;
    }

    const aqi = this._getState('aqi');
    if (aqi === undefined) {
      return html`
        <ha-card class="${`loading-card card-${this.size}`}">
          <ha-circular-progress active></ha-circular-progress>
        </ha-card>
      `;
    }

    return html`
      <ha-card class="${`main-card card-${this.size}`}">
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

          <div class="aqi-state">
            <span class="hide-sm">${this.config.aqi_type === 'daily' ? t('air_quality_index') : t('air_quality_index_instant')}</span>
            <span class="short-label">${this.config.aqi_type === 'daily' ? 'AQI' : 'AQI Instant'}</span>
            <b>${aqi}</b>
          </div>
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
          <div class="value">
            <span>${this._getState('pm_2_5') ?? ''}</span>
            <span>µg/m³</span>
          </div>
        </button>
        <button type="button" class="sensor-btn" @click=${() => this._displayDetailEntityInfo('pm_10')}>
          <div class="label">PM<sub>10</sub></div>
          <div class="icon">
            <img src="/air-quality/pm-10.svg" alt="PM10" />
          </div>
          <div class="value">
            <span>${this._getState('pm_10') ?? ''}</span>
            <span>µg/m³</span>
          </div>
        </button>
        <button type="button" class="sensor-btn" @click=${() => this._displayDetailEntityInfo('temperature')}>
          <div class="label">Temperature</div>
          <div class="icon">
            <img src="/air-quality/temperature.svg" alt="Temperature" />
          </div>
          <div class="value">
            <span>${this._getState('temperature') ?? ''}</span>
            <span>°C</span>
          </div>
        </button>
        <button type="button" class="sensor-btn" @click=${() => this._displayDetailEntityInfo('humidity')}>
          <div class="label">Humidity</div>
          <div class="icon">
            <img src="/air-quality/humidity.svg" alt="Humidity" />
          </div>
          <div class="value">
            <span>${this._getState('humidity') ?? ''}</span>
            <span>%</span>
          </div>
        </button>
        <button type="button" class="sensor-btn" @click=${() => this._displayDetailEntityInfo('pressure')}>
          <div class="label">Pressure</div>
          <div class="icon">
            <img src="/air-quality/pressure.svg" alt="Pressure" />
          </div>
          <div class="value">
            <span>${this._getState('pressure')?.toFixed(0) ?? ''}</span>
            <span>mmHg</span>
          </div>
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

  private _handleWindowResize(): void {
    this.size = this.clientWidth < 400 ? CardSize.SM : CardSize.MD;
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
    if (name === 'aqi' && this.config?.aqi_type === 'hourly') {
      name = 'aqi_instant';
    }
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
