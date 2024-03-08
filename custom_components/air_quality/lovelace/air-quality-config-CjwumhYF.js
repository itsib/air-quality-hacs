import { c as css, t, L as LitElement, h as html, f as fireEvent } from './index-3sJKaO_K.js';

var styles = css`:host{--mdc-menu-min-width:452px;--mdc-list-vertical-padding:0px;--mdc-typography-body2-font-size:13px}.air-quality-config{padding-right:20px}@media only screen and (max-width:1200px){:host{--mdc-menu-min-width:797px}.air-quality-config{padding-right:0}}@media only screen and (max-width:850px){:host{--mdc-menu-min-width:469px}}@media only screen and (max-width:560px){:host{--mdc-menu-min-width:calc(100vw - 80px)}}@media only screen and (max-width:450px){:host{--mdc-menu-min-width:calc(100vw - 48px)}}`;

const SCHEMA = [
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
                translation_key: 'config'
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
class AirQualityConfig extends LitElement {
    static get properties() {
        return {
            hass: {},
            config: {},
        };
    }
    setConfig(config) {
        this.config = config;
    }
    render() {
        if (!this.hass || !this.config) {
            return html ``;
        }
        return html `
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
    _computeLabel(schema) {
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
    _localizeValue(key) {
        return t(key);
    }
    _computeHelper(schema) {
        switch (schema.name) {
            default:
                return undefined;
        }
    }
    _valueChanged(event) {
        fireEvent(this, 'config-changed', { config: event.detail.value });
    }
}
AirQualityConfig.styles = styles;
window.customElements.define('air-quality-config', AirQualityConfig);

export { AirQualityConfig };
