import{t as e,L as a,h as t,f as i,c as n}from"./air-quality-card-e513950a.js";const o=[{name:"aqi_type",default:"daily",required:!0,selector:{select:{multiple:!1,custom_value:!1,mode:"dropdown",options:[{value:"daily",label:"options.daily"},{value:"hourly",label:e("options.hourly")}],translation_key:"config"}}},{name:"enable_recommendation",default:!0,selector:{boolean:{}}},{name:"display_first_recommendation",default:!1,selector:{boolean:{}}}];class l extends a{static get styles(){return(e=>e`
    :host {
      --mdc-menu-min-width: 452px;
      --mdc-list-vertical-padding: 0px;
      --mdc-typography-body2-font-size: 13px;
    }

    .air-quality-config {
      padding-right: 20px;
    }

    @media only screen and (max-width: 1200px) {
      :host {
        --mdc-menu-min-width: 797px;
      }

      .air-quality-config {
        padding-right: 0;
      }
    }

    @media only screen and (max-width: 850px) {
      :host {
        --mdc-menu-min-width: 469px;
      }
    }

    @media only screen and (max-width: 560px) {
      :host {
        --mdc-menu-min-width: calc(100vw - 80px);
      }
    }

    @media only screen and (max-width: 450px) {
      :host {
        --mdc-menu-min-width: calc(100vw - 48px);
      }
    }
  `)(n)}static get properties(){return{hass:{},config:{}}}setConfig(e){this.config=e}render(){return this.hass&&this.config?t`
      <slot></slot>
      <div class="air-quality-config">
        <ha-form
          .hass=${this.hass}
          .data=${this.config}
          .schema=${o}
          .computeLabel=${this._computeLabel}
          .computeHelper=${this._computeHelper}
          .localizeValue=${this._localizeValue}
          @value-changed=${this._valueChanged}
        >
        </ha-form>
      </div>
    `:t``}_computeLabel(a){switch(a.name){case"aqi_type":return e("config.selector_label");case"enable_recommendation":return e("config.toggle_recommendations_label");case"display_first_recommendation":return e("config.toggle_first_recommendation");default:return}}_localizeValue(a){return e(a)}_computeHelper(e){e.name}_valueChanged(e){i(this,"config-changed",{config:e.detail.value})}}window.customElements.define("air-quality-config",l);export{l as AirQualityConfig};
