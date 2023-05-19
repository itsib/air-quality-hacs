import { AirQualityCardConfig, HaFormSchema, HomeAssistant, LovelaceCardEditor, ValueChangeEvent } from './types';
import { css, LitElement, TemplateResult, html } from 'lit';
import { styles } from './air-quality-config-styles';
import { t } from './i18n';
import { fireEvent } from './utils';

declare global {
  interface HTMLElementTagNameMap {
    'air-quality-config': AirQualityConfig;
  }
}

const SCHEMA: HaFormSchema[] = [
  {
    name: 'aqi_type',
    default: 'daily',
    required: true,
    selector: {
      select: {
        multiple: false,
        custom_value: false,
        mode: 'dropdown',
        options: [
          { value: 'daily', label: 'options.daily' },
          { value: 'hourly', label: t('options.hourly') },
        ],
        translation_key: 'config',
      },
    },
  },
  {
    name: 'enable_recommendation',
    default: true,
    selector: {
      boolean: {},
    },
  },
  {
    name: 'display_first_recommendation',
    default: false,
    selector: {
      boolean: {},
    },
  },
];

export class AirQualityConfig extends LitElement implements LovelaceCardEditor {
  public hass!: HomeAssistant;

  private config!: AirQualityCardConfig;

  static get styles() {
    return styles(css);
  }

  static get properties() {
    return {
      hass: {},
      config: {},
    };
  }

  setConfig(config: AirQualityCardConfig): void {
    this.config = config;
  }

  override render(): TemplateResult {
    if (!this.hass || !this.config) {
      return html``;
    }

    return html`
      <slot></slot>
      <div class="air-quality-config">
        <ha-form
          .hass=${this.hass}
          .data=${this.config}
          .schema=${SCHEMA}
          .computeLabel=${this._computeLabel}
          .computeHelper=${this._computeHelper}
          .localizeValue=${this._localizeValue}
          @value-changed=${this._valueChanged}
        >
        </ha-form>
      </div>
    `;
  }

  private _computeLabel(schema: HaFormSchema): string | undefined {
    // console.log('computeLabel', schema);
    switch (schema.name) {
      case 'aqi_type':
        return t('config.selector_label');
      case 'enable_recommendation':
        return t('config.toggle_recommendations_label');
      case 'display_first_recommendation':
        return t('config.toggle_first_recommendation');
      default:
        return undefined;
    }
  }

  private _localizeValue(key: string): string {
    return t(key);
  }

  private _computeHelper(schema: HaFormSchema): string | undefined {
    switch (schema.name) {
      default:
        return undefined;
    }
  }

  private _valueChanged(event: ValueChangeEvent): void {
    fireEvent(this, 'config-changed', { config: event.detail.value });
  }
}

(window as any).customElements.define('air-quality-config', AirQualityConfig);
