const e=Object.getPrototypeOf(customElements.get("home-assistant-main")),{html:t,css:i}=e.prototype;var a,n;!function(e){e[e.FIRST=1]="FIRST",e[e.SECOND=2]="SECOND",e[e.THIRD=3]="THIRD",e[e.FOURTH=4]="FOURTH",e[e.FIFTH=5]="FIFTH",e[e.SIXTH=6]="SIXTH",e[e.SEVENTH=7]="SEVENTH"}(a||(a={})),function(e){e.SM="sm",e.MD="md"}(n||(n={}));var r="Air Quality",s="Air quality index",o="Air quality index",l="Recommendation:",d="Health effects:",c={1:{label:"The Air is Clean",effects:"The air quality is considered good. Air pollution does not pose a health hazard.",recommendation:"Nope"},2:{label:"Moderate Pollution",effects:"The air quality is generally acceptable, but some pollutants may pose a danger to people who are particularly sensitive to air pollution.",recommendation:"Elderly people, children, pregnant women and people suffering from heart disease, asthma or other respiratory diseases should limit outdoor activities."},3:{label:"Increased Pollution",effects:"People who are sensitive to air pollution may experience negative effects of pollutants. For the majority of the population, air pollution does not have a noticeable effect on health.",recommendation:"Elderly people, children, pregnant women and people suffering from heart disease, asthma or other respiratory diseases should significantly limit outdoor activities."},4:{label:"High Pollution",effects:"Everyone can feel the negative impact of air pollution on their health; particularly sensitive people can experience serious problems.",recommendation:"Elderly people, children, pregnant women and people suffering from heart disease, asthma or other respiratory diseases should avoid being outdoors. Everyone else, especially children, should limit their outdoor activities."},5:{label:"Very High Pollution",effects:"An emergency situation with the impact of pollution on human health. All population groups are at risk of health deterioration.",recommendation:"Elderly people, children, pregnant women and people suffering from heart disease, asthma or other respiratory diseases should avoid even a short stay outdoors. Everyone else, especially children, should avoid being outdoors."},6:{label:"Climate Catastrophe",effects:"Catastrophic health hazard: There may be serious consequences for human health.",recommendation:"All groups of the population should avoid even a short stay in the open air."},7:{label:"Death and Destruction",effects:"Catastrophic health hazard: serious consequences for human health.",recommendation:"All population groups are advised to stay indoors with filtered air. In the open air, it is necessary to use respirators."}},p={selector_label:"Choose the AQI calculation method",options:{daily:"Average per day",hourly:"Instant"},toggle_recommendations_label:"Display recommendations in case of environmental pollution.",toggle_first_recommendation:"Display recommendations at the lowest AQI level."},h={title:"Malfunction",invalid_configuration:"Invalid Configuration",integration_not_provide_states:"Integration does not provide data. Check if Air Quality integration is active. Or delete the integration card from the control panel.",invalid_sensor:"Sensor {sensorName} not found"},m={card_name:r,air_quality_index:s,air_quality_index_instant:o,recommendation:l,health_effects:d,aqi_levels:c,config:p,error:h},u="Качество Воздуха",f="Индекс качества воздуха",g="Индекс качества воздуха",_="Рекомендации:",v="Влияние на здоровье:",y={1:{label:"Воздух в Норме",effects:"Качество воздуха считается хорошим. Загрязнение воздуха не представляет опасности для здоровья.",recommendation:"Нет"},2:{label:"Небольшое Загрязнение",effects:"Качество воздуха в целом является приемлемым, однако некоторые загрязняющие вещества могут представлять опасность для людей, особо чувствительных к загрязнению воздуха.",recommendation:"Пожилым людям, детям, беременным женщинам и людям, страдающим болезнями сердца, астмой или другими респираторными заболеваниями, следует ограничить пребывание на открытом воздухе."},3:{label:"Повышенное Загрязнение",effects:"Люди, чувствительные к загрязнению воздуха, могут испытывать негативное воздействие загрязняющих веществ. Для основной массы населения загрязнение воздуха не оказывает заметного влияния на здоровье.",recommendation:"Пожилым людям, детям, беременным женщинам и людям, страдающим болезнями сердца, астмой или другими респираторными заболеваниями, следует существенно ограничить пребывание на открытом воздухе."},4:{label:"Высокое Загрязнение",effects:"Каждый человек может ощутить негативное влияние загрязнения воздуха на свое здоровье; особо чувствительные люди могут испытывать серьезные проблемы.",recommendation:"Пожилым людям, детям, беременным женщинам и людям, страдающим болезнями сердца, астмой или другими респираторными заболеваниями, следует избегать пребывания на открытом воздухе. Все остальные, особенно дети, должны ограничить пребывание на открытом воздухе."},5:{label:"Ужасно Задымлено",effects:"Чрезвычайная ситуация с воздействием загрязнения на здоровье человека. Все группы населения подвержены риску ухудшения здоровья.",recommendation:"Пожилым людям, детям, беременным женщинам и людям, страдающим болезнями сердца, астмой или другими респираторными заболеваниями, следует избегать даже кратковременного пребывания на открытом воздухе. Все остальные, особенно дети, должны избегать пребывания на открытом воздухе."},6:{label:"Климатическая Катастрофа",effects:"Катастрофическая опасность для здоровья: могут возникнуть серьезные последствия для здоровья человека.",recommendation:"Всем группам населения следует избегать даже кратковременного пребывания на открытом воздухе."},7:{label:"Смерть и Разрушение",effects:"Катастрофическая опасность для здоровья: серьезные последствия для здоровья человека.",recommendation:"Всем группам населения рекомендуется оставаться в помещениях с отфильтрованным воздухом. На открытом воздухе необходимо пользоваться респираторами."}},b={selector_label:"Выберите способ расчета AQI",options:{daily:"Средний за сутки",hourly:"В реальном времени"},toggle_recommendations_label:"Показывать рекомендации при загрязнении окружающей среды.",toggle_first_recommendation:"Показывать рекомендации при самом низком уровне AQI."},q={title:"Оно Сломалось",invalid_configuration:"Ошибка в конфигурации",integration_not_provide_states:"Интеграция не предоставляет данные. Проверьте, активна ли  интеграция Air Quality. Или удалите карточку интеграции с панели управления.",invalid_sensor:"Датчик {sensorName} не найден"},x={card_name:u,air_quality_index:f,air_quality_index_instant:g,recommendation:_,health_effects:v,aqi_levels:y,config:b,error:q};const w={en:Object.freeze({__proto__:null,air_quality_index:s,air_quality_index_instant:o,aqi_levels:c,card_name:r,config:p,default:m,error:h,health_effects:d,recommendation:l}),ru:Object.freeze({__proto__:null,air_quality_index:f,air_quality_index_instant:g,aqi_levels:y,card_name:u,config:b,default:x,error:q,health_effects:v,recommendation:_})};function I(e,t){if("string"==typeof t)return t;const i=e.split("."),[a,...n]=i,r=t[a];return r&&"string"!=typeof r?I(n&&n.length>0?n.join("."):"",r):r}function E(e,t="",i=""){const a=function(){var e;let t=null===(e=localStorage.getItem("selectedLanguage"))||void 0===e?void 0:e.replace(/['"]+/g,"").replace("-","_");return"null"===t&&(t=void 0),t||(t=localStorage.getItem("i18nextLng")),t&&"null"!==t||(t="en"),t}();let n;try{n=Object.assign({},w[a])}catch(e){n=Object.assign({},w.en)}let r=I(e,n);return void 0===r&&(r=I(e,Object.assign({},w.en))),r&&""!==t&&""!==i&&(r=r.replace(`{${t}}`,i)),null!=r?r:""}function z(e){return e>500?a.SEVENTH:e>300?a.SIXTH:e>200?a.FIFTH:e>150?a.FOURTH:e>100?a.THIRD:e>50?a.SECOND:a.FIRST}function S(e,t,i,a){a=a||{},i=null==i?{}:i;const n=new Event(t,{bubbles:void 0===a.bubbles||a.bubbles,cancelable:Boolean(a.cancelable),composed:void 0===a.composed||a.composed});return n.detail=i,e.dispatchEvent(n),n}var $=i`:host{font-family:var(--paper-font-body1_-_font-family);-webkit-font-smoothing:var(--paper-font-body1_-_-webkit-font-smoothing);color:var(--primary-text-color);font-size:var(--paper-font-body1_-_font-size);font-weight:var(--paper-font-body1_-_font-weight);line-height:var(--paper-font-body1_-_line-height)}.main-card.card-sm .hide-sm{display:none}.main-card{padding:16px}.main-card .aqi-btn-content{align-items:center;background:transparent;border:none;cursor:pointer;display:flex;flex-direction:row;height:64px;justify-content:space-between;outline:none;padding:0;text-align:left;width:100%}.main-card .aqi-btn-content .image{align-items:center;display:flex;height:64px;justify-content:center;margin-right:16px;min-width:64px;width:64px}.main-card .aqi-btn-content .info{margin-right:auto;max-width:calc(100% - 80px)}.main-card .aqi-btn-content .info .title{color:inherit;font-family:inherit;font-size:var(--ha-card-header-font-size,24px);line-height:1.2;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.main-card .aqi-btn-content .info .aqi-state{color:var(--secondary-text-color);font-size:13px;line-height:1;margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.main-card .aqi-btn-content .info .aqi-state .short-label:before{content:"("}.main-card .aqi-btn-content .info .aqi-state .short-label:after{content:"):"}.main-card .aqi-btn-content .info .aqi-state b{color:var(--primary-text-color);font-size:18px;font-weight:500}.main-card .readings{align-items:stretch;display:flex;flex-direction:row;justify-content:space-around;margin:16px -10px}.main-card .readings .sensor-btn{background:transparent;border:none;cursor:pointer;display:block;outline:none;padding:0;text-align:center;width:78px}.main-card .readings .sensor-btn .label{color:var(--secondary-text-color);font-size:13px;font-weight:400;height:20px;line-height:20px;margin-bottom:6px;max-width:100%;overflow:hidden;padding:0 2px;text-overflow:ellipsis;white-space:nowrap}.main-card .readings .sensor-btn .icon img{height:40px;width:40px}.main-card .readings .sensor-btn .value{font-size:13px;height:20px;line-height:20px;margin-top:6px;white-space:nowrap}.main-card .recommendation{padding-top:1px}.main-card .recommendation .title{color:var(--primary-text-color);font-size:16px;font-weight:400;margin:14px 0 4px}.main-card .recommendation .paragraph{color:var(--secondary-text-color)}.main-card.card-sm .aqi-btn-content .info .title{font-size:var(--ha-card-header-font-size,22px)}.main-card.card-sm .aqi-btn-content .info .aqi-state{margin-top:5px}.main-card.card-sm .aqi-btn-content .info .aqi-state .short-label:before{content:""}.main-card.card-sm .aqi-btn-content .info .aqi-state .short-label:after{content:":"}.main-card.card-sm .aqi-btn-content .info .aqi-state b{font-size:16px}.main-card.card-sm .readings .sensor-btn .label{font-size:12px}.main-card.card-sm .readings .sensor-btn .icon img{height:36px;width:36px}.main-card.card-sm .readings .sensor-btn .value{height:40px;margin-top:8px}.main-card.card-sm .readings .sensor-btn .value>span{display:block;text-align:center}.main-card.card-sm .readings .sensor-btn .value span:first-child{font-size:16px}.main-card.card-sm .readings .sensor-btn .value span:last-child{color:var(--secondary-text-color);font-size:12px;line-height:16px}.main-card.card-sm .recommendation .title{font-size:14px}.main-card.card-sm .recommendation .paragraph{font-size:13px;line-height:17px}.loading-card{padding:20px 0;text-align:center}.error-card{display:flex;flex-direction:column;justify-content:center}.error-card .title{font-size:26px;padding:14px 0 28px;text-align:left}.error-card .icon{text-align:center}.error-card .icon img{height:100px;width:100px}.error-card .message{font-size:16px;padding:18px 10px 6px;text-align:center}`;class k extends e{constructor(){super(...arguments),this.size=n.MD,this._states=new Map}static get properties(){return{hass:{},config:{attribute:!1},size:{state:!0,type:String}}}static async getConfigElement(){return await import("./air-quality-config-DqmEIYqp.js"),document.createElement("air-quality-config")}static getStubConfig(){return{aqi_type:"daily",enable_recommendation:!0,display_first_recommendation:!1}}setConfig(e){if(!e)throw new Error(E("error.invalid_configuration"));e.test_gui&&function(){let e=document.querySelector("home-assistant");if(e=e&&e.shadowRoot,e=e&&e.querySelector("home-assistant-main"),e=e&&e.shadowRoot,e=e&&e.querySelector("app-drawer-layout partial-panel-resolver"),e=e&&e.shadowRoot||e,e=e&&e.querySelector("ha-panel-lovelace"),e=e&&e.shadowRoot,e=e&&e.querySelector("hui-root"),e){const t=e.lovelace;return t.current_view=e.___curView,t}return null}().setEditMode(!0),this.config=Object.assign({aqi_type:"daily",enable_recommendation:!0,display_first_recommendation:!1},e)}getCardSize(){return 3}shouldUpdate(e){var t;if(!this.config||!this.hass)return!0;if(!this._entitiesIds)try{this._entitiesIds=function(e){const t=Object.keys(e.entities).filter((t=>"air_quality"===e.entities[t].platform));if(7!==t.length)throw new Error(E("error.integration_not_provide_states"));const i=new Map,a=t.find((e=>/^sensor\.air_quality_aqi_?(?<!instant)$/.test(e)));if(!a)throw new Error(E("error.invalid_sensor","sensorName","sensor.air_quality_aqi"));i.set("aqi",a);const n=t.find((e=>e.startsWith("sensor.air_quality_aqi_instant")));if(!n)throw new Error(E("error.invalid_sensor","sensorName","sensor.air_quality_aqi_instant"));i.set("aqi_instant",n);const r=t.find((e=>e.startsWith("sensor.air_quality_pm_2_5")));if(!r)throw new Error(E("error.invalid_sensor","sensorName","sensor.air_quality_pm_2_5"));i.set("pm_2_5",r);const s=t.find((e=>e.startsWith("sensor.air_quality_pm_10")));if(!s)throw new Error(E("error.invalid_sensor","sensorName","sensor.air_quality_pm_10"));i.set("pm_10",s);const o=t.find((e=>e.startsWith("sensor.air_quality_temperature")));if(!o)throw new Error(E("error.invalid_sensor","sensorName","sensor.air_quality_temperature"));i.set("temperature",o);const l=t.find((e=>e.startsWith("sensor.air_quality_humidity")));if(!l)throw new Error(E("error.invalid_sensor","sensorName","sensor.air_quality_humidity"));i.set("humidity",l);const d=t.find((e=>e.startsWith("sensor.air_quality_pressure")));if(!d)throw new Error(E("error.invalid_sensor","sensorName","sensor.air_quality_pressure"));return i.set("pressure",d),i}(this.hass)}catch(e){return this._errorMessage=e.message,!0}let i=!1;if(e.has("hass"))for(const e of this._entitiesIds.keys()){const a=this._entitiesIds.get(e),n=null===(t=this.hass.states[a])||void 0===t?void 0:t.state;this._states.get(e)!==n&&(this._states.set(e,n),i=!0)}return(e.has("config")||e.has("size"))&&(i=!0),i}connectedCallback(){super.connectedCallback(),this._handleWindowResize(),this._resizeCallback=this._handleWindowResize.bind(this),window.addEventListener("resize",this._resizeCallback)}disconnectedCallback(){super.disconnectedCallback(),this._resizeCallback&&window.removeEventListener("resize",this._resizeCallback)}render(){if(this._errorMessage)return t`
        <ha-card class="${`error-card card-${this.size}`}">
          <div class="title">
            <span>${E("error.title")}</span>
          </div>
          <div class="icon">
            <img src="/air-quality/broken.svg" alt="Error" />
          </div>
          <div class="message">${this._errorMessage}</div>
        </ha-card>
      `;const e=this._getState("aqi");return void 0===e?t`
        <ha-card class="${`loading-card card-${this.size}`}">
          <ha-circular-progress active></ha-circular-progress>
        </ha-card>
      `:t`
      <ha-card class="${`main-card card-${this.size}`}">
        ${this._renderHeaderBlock(e)}
        <slot name="header"></slot>
        ${this._renderEntitiesBlock()}
        <slot name="entities"></slot>
        ${this._renderRecommendationBlock(e)}
        <slot></slot>
      </ha-card>
    `}_renderHeaderBlock(e){const i=z(e);return t`
      <button type="button" class="aqi-btn-content" @click="${()=>this._displayDetailEntityInfo("aqi")}">
        <div class="image">
          <img src="${function(e){switch(e){case a.FIRST:return"/air-quality/level-good.svg";case a.SECOND:return"/air-quality/level-moderate.svg";case a.THIRD:return"/air-quality/level-increased.svg";case a.FOURTH:return"/air-quality/level-high.svg";case a.FIFTH:case a.SIXTH:case a.SEVENTH:return"/air-quality/level-very-high.svg"}}(i)}" alt="AQI Level Icon" width="50" height="50" />
        </div>
        <div class="info">
          <div class="title">${E(`aqi_levels.${i}.label`)}</div>

          <div class="aqi-state">
            <span class="hide-sm">${"daily"===this.config.aqi_type?E("air_quality_index"):E("air_quality_index_instant")}</span>
            <span class="short-label">${"daily"===this.config.aqi_type?"AQI":"AQI Instant"}</span>
            <b>${e}</b>
          </div>
        </div>
      </button>
    `}_renderEntitiesBlock(){var e,i,a,n,r,s;return t`
      <div class="readings">
        <button type="button" class="sensor-btn" @click="${()=>this._displayDetailEntityInfo("pm_2_5")}">
          <div class="label">PM<sub>2.5</sub></div>
          <div class="icon">
            <img src="/air-quality/pm-2-5.svg" alt="PM2.5" />
          </div>
          <div class="value">
            <span>${null!==(e=this._getState("pm_2_5"))&&void 0!==e?e:""}</span>
            <span>µg/m³</span>
          </div>
        </button>
        <button type="button" class="sensor-btn" @click="${()=>this._displayDetailEntityInfo("pm_10")}">
          <div class="label">PM<sub>10</sub></div>
          <div class="icon">
            <img src="/air-quality/pm-10.svg" alt="PM10" />
          </div>
          <div class="value">
            <span>${null!==(i=this._getState("pm_10"))&&void 0!==i?i:""}</span>
            <span>µg/m³</span>
          </div>
        </button>
        <button type="button" class="sensor-btn" @click="${()=>this._displayDetailEntityInfo("temperature")}">
          <div class="label">Temperature</div>
          <div class="icon">
            <img src="/air-quality/temperature.svg" alt="Temperature" />
          </div>
          <div class="value">
            <span>${null!==(a=this._getState("temperature"))&&void 0!==a?a:""}</span>
            <span>°C</span>
          </div>
        </button>
        <button type="button" class="sensor-btn" @click="${()=>this._displayDetailEntityInfo("humidity")}">
          <div class="label">Humidity</div>
          <div class="icon">
            <img src="/air-quality/humidity.svg" alt="Humidity" />
          </div>
          <div class="value">
            <span>${null!==(n=this._getState("humidity"))&&void 0!==n?n:""}</span>
            <span>%</span>
          </div>
        </button>
        <button type="button" class="sensor-btn" @click="${()=>this._displayDetailEntityInfo("pressure")}">
          <div class="label">Pressure</div>
          <div class="icon">
            <img src="/air-quality/pressure.svg" alt="Pressure" />
          </div>
          <div class="value">
            <span>${null!==(s=null===(r=this._getState("pressure"))||void 0===r?void 0:r.toFixed(0))&&void 0!==s?s:""}</span>
            <span>mmHg</span>
          </div>
        </button>
      </div>
    `}_renderRecommendationBlock(e){var i,a;if(!(null===(i=this.config)||void 0===i?void 0:i.enable_recommendation))return;const n=(null===(a=this.config)||void 0===a?void 0:a.display_first_recommendation)?0:1,r=z(e);return r<=n?void 0:t`
      <div class="recommendation">
        <div class="title">${E("health_effects")}</div>
        <div class="paragraph">${E(`aqi_levels.${r}.effects`)}</div>
        <div class="title">${E("recommendation")}</div>
        <div class="paragraph">${E(`aqi_levels.${r}.recommendation`)}</div>
      </div>
    `}_handleWindowResize(){this.size=this.clientWidth<400?n.SM:n.MD}_getEntityId(e){var t;if(this._entitiesIds)return"aqi"===e?"daily"===(null===(t=this.config)||void 0===t?void 0:t.aqi_type)?this._entitiesIds.get("aqi"):this._entitiesIds.get("aqi_instant"):this._entitiesIds.get(e)}_getState(e){var t;"aqi"===e&&"hourly"===(null===(t=this.config)||void 0===t?void 0:t.aqi_type)&&(e="aqi_instant");const i=this._states.get(e);if(!i||"unknown"===i)return;const a=Number(i);return isNaN(a)?void 0:a}_displayDetailEntityInfo(e){const t=this._getEntityId(e);t&&S(this,"hass-more-info",{entityId:t})}}k.styles=$,window.customElements.define("air-quality-card",k),window.customCards=window.customCards||[],window.customCards.push({type:"air-quality-card",name:E("card_name"),description:"Displays the readings of the weather station sensors. Provided by Air Quality integration.",preview:!0,configurable:!0});export{k as A,e as L,i as c,S as f,t as h,E as t};
