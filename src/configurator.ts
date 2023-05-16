import { css, CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { fireEvent, HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import { ScopedRegistryHost } from '@lit-labs/scoped-registry-mixin';
import { AirQualityCardConfig } from './types';
import { customElement, property, state } from 'lit/decorators.js';
import { formfieldDefinition } from '../elements/formfield';
import { selectDefinition } from '../elements/select';
import { textfieldDefinition } from '../elements/textfield';
import { switchDefinition } from '../elements/switch';
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
    ...switchDefinition,
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

  protected render(): TemplateResult | void {
    if (!this.hass || !this._helpers) {
      return html``;
    }

    return html`
      <mwc-select
        naturalMenuWidth
        fixedMenuPosition
        .label=${t('configurator.selector_label')}
        .value=${this._config?.aqi_type}
        @selected=${this._aqiTypeChanged}
        @closed=${ev => ev.stopPropagation()}
      >
        <mwc-list-item value="daily">${t('configurator.option_daily')}</mwc-list-item>
        <mwc-list-item value="hourly">${t('configurator.option_hourly')}</mwc-list-item>
      </mwc-select>

      <div class="switch-block">
        <mwc-formfield .label=${t('configurator.toggle_recommendations_label')}>
          <mwc-switch .checked=${!!this._config?.enable_recommendation} @change=${this._toggleRecommendation}></mwc-switch>
        </mwc-formfield>
      </div>

      <div class="switch-block">
        <mwc-formfield .label=${t('configurator.toggle_first_recommendation')}>
          <mwc-switch .checked=${!!this._config?.display_first_recommendation} @change=${this._toggleFirstRecommendation}></mwc-switch>
        </mwc-formfield>
      </div>
    `;
  }

  private _initialize(): void {
    if (this.hass === undefined) return;
    if (this._config === undefined) return;
    if (this._helpers === undefined) return;
    this._initialized = true;
  }

  private async loadCardHelpers(): Promise<void> {
    this._helpers = await (window as any).loadCardHelpers();
  }

  private _aqiTypeChanged(event: CustomEvent): void {
    if (!this._config || !this.hass || this._config.aqi_type === (event.target as any).value) {
      return;
    }

    this._config = {
      ...this._config,
      aqi_type: (event.target as any).value,
    };

    fireEvent(this, 'config-changed', { config: this._config });
  }

  private _toggleRecommendation(event: CustomEvent): void {
    if (!this._config || !this.hass || this._config.enable_recommendation === (event.target as any).checked) {
      return;
    }
    this._config = {
      ...this._config,
      enable_recommendation: (event.target as any).checked,
    };
    fireEvent(this, 'config-changed', { config: this._config });
  }

  private _toggleFirstRecommendation(event: CustomEvent): void {
    if (!this._config || !this.hass || this._config.display_first_recommendation === (event.target as any).checked) {
      return;
    }
    this._config = {
      ...this._config,
      display_first_recommendation: (event.target as any).checked,
    };
    fireEvent(this, 'config-changed', { config: this._config });
  }

  static styles: CSSResultGroup = css`
    :host {
      --mdc-typography-body2-font-size: 13px;
    }

    mwc-select,
    mwc-textfield {
      margin-bottom: 16px;
      display: block;
    }

    .switch-block {
      padding: 16px 4px;
    }
    .switch-block mwc-switch {
      margin-right: 16px;
      --mdc-theme-secondary: var(--switch-checked-color);
    }
  `;
}
