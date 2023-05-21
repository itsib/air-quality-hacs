import{i as e,t as a,s as i,x as t,f as n}from"./air-quality-card-34f71312.js";var o=e`:host{--mdc-menu-min-width:452px;--mdc-list-vertical-padding:0px;--mdc-typography-body2-font-size:13px}.air-quality-config{padding-right:20px}@media only screen and (max-width:1200px){:host{--mdc-menu-min-width:797px}.air-quality-config{padding-right:0}}@media only screen and (max-width:850px){:host{--mdc-menu-min-width:469px}}@media only screen and (max-width:560px){:host{--mdc-menu-min-width:calc(100vw - 80px)}}@media only screen and (max-width:450px){:host{--mdc-menu-min-width:calc(100vw - 48px)}}`;const l=[{name:"aqi_type",default:"daily",required:!0,selector:{select:{multiple:!1,custom_value:!1,mode:"dropdown",options:[{value:"daily",label:"options.daily"},{value:"hourly",label:a("options.hourly")}],translation_key:"config"}}},{name:"enable_recommendation",default:!0,selector:{boolean:{}}},{name:"display_first_recommendation",default:!1,selector:{boolean:{}}}];class s extends i{static get properties(){return{hass:{},config:{}}}setConfig(e){this.config=e}render(){return this.hass&&this.config?t`
      <slot></slot>
      <div class="air-quality-config">
        <ha-form
          .hass=${this.hass}
          .data=${this.config}
          .schema=${l}
          .computeLabel=${this._computeLabel}
          .computeHelper=${this._computeHelper}
          .localizeValue=${this._localizeValue}
          @value-changed=${this._valueChanged}
        >
        </ha-form>
      </div>
    `:t``}_computeLabel(e){switch(e.name){case"aqi_type":return a("config.selector_label");case"enable_recommendation":return a("config.toggle_recommendations_label");case"display_first_recommendation":return a("config.toggle_first_recommendation");default:return}}_localizeValue(e){return a(e)}_computeHelper(e){e.name}_valueChanged(e){n(this,"config-changed",{config:e.detail.value})}}s.styles=o,window.customElements.define("air-quality-config",s);export{s as AirQualityConfig};
