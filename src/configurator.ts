import { css, CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { fireEvent, HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import { ScopedRegistryHost } from '@lit-labs/scoped-registry-mixin';
import { AirQualityCardConfig } from './types';
import { customElement, property, state } from 'lit/decorators.js';
import { formfieldDefinition } from '../elements/formfield';
import { selectDefinition } from '../elements/select';
import { textfieldDefinition } from '../elements/textfield';
import { SingleSelectedEvent } from '@material/mwc-list/mwc-list-foundation';
import { t } from './i18n';

@customElement('air-quality-card-configurator')
export class AirQualityCardConfigurator extends ScopedRegistryHost(LitElement) implements LovelaceCardEditor {
  @property({ attribute: false })
  public hass?: HomeAssistant;

  @state()
  private _config?: AirQualityCardConfig;

  @state()
  private _helpers?: any;

  private _initialized = false;

  static elementDefinitions = {
    ...textfieldDefinition,
    ...selectDefinition,
    ...formfieldDefinition,
  };

  public setConfig(config: AirQualityCardConfig): void {
    this._config = config;

    this.loadCardHelpers();
  }

  protected shouldUpdate(): boolean {
    if (!this._initialized) {
      this._initialize();
    }

    return true;
  }

  get _aqi_type(): 'hourly' | 'daily' {
    return this._config?.aqi_type || 'daily';
  }

  protected render(): TemplateResult | void {
    if (!this.hass || !this._helpers) {
      return html``;
    }

    return html`
      <mwc-select
        naturalMenuWidth
        fixedMenuPosition
        .label=${t('aqi_calculation_method_selector.label')}
        .value=${this._aqi_type}
        @selected=${this._aqiTypeChanged}
        @closed=${ev => ev.stopPropagation()}
      >
        <mwc-list-item value="daily">${t('aqi_calculation_method_selector.normal_way')}</mwc-list-item>
        <mwc-list-item value="hourly">${t('aqi_calculation_method_selector.instant_way')}</mwc-list-item>
      </mwc-select>
    `;
  }

  private _initialize(): void {
    console.log(this.hass);
    console.log(this._config);
    console.log(this._helpers);
    if (this.hass === undefined) return;
    if (this._config === undefined) return;
    if (this._helpers === undefined) return;
    this._initialized = true;
  }

  private async loadCardHelpers(): Promise<void> {
    this._helpers = await (window as any).loadCardHelpers();
  }

  private _aqiTypeChanged(event: SingleSelectedEvent): void {
    if (!this._config || !this.hass || this._config.aqi_type === (event.target as any).value) {
      return;
    }

    this._config = {
      ...this._config,
      aqi_type: (event.target as any).value,
    };

    fireEvent(this, 'config-changed', { config: this._config });
  }

  static styles: CSSResultGroup = css`
    mwc-select,
    mwc-textfield {
      margin-bottom: 16px;
      display: block;
    }
    mwc-formfield {
      padding-bottom: 8px;
    }
    mwc-switch {
      --mdc-theme-secondary: var(--switch-checked-color);
    }
  `;
}
