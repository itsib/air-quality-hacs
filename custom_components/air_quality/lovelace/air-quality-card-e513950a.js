const e=Object.getPrototypeOf(customElements.get("home-assistant-main")),{html:t,css:i}=e.prototype;var a="Air Quality",r="Air quality index (AQI)",n="Air quality index (AQI Instant)",o="Recommendation:",s="Health effects:",l={1:{label:"The Air is Clean",effects:"The air quality is considered good. Air pollution does not pose a health hazard.",recommendation:"Nope"},2:{label:"Moderate Pollution",effects:"The air quality is generally acceptable, but some pollutants may pose a danger to people who are particularly sensitive to air pollution.",recommendation:"Elderly people, children, pregnant women and people suffering from heart disease, asthma or other respiratory diseases should limit outdoor activities."},3:{label:"Increased Pollution",effects:"People who are sensitive to air pollution may experience negative effects of pollutants. For the majority of the population, air pollution does not have a noticeable effect on health.",recommendation:"Elderly people, children, pregnant women and people suffering from heart disease, asthma or other respiratory diseases should significantly limit outdoor activities."},4:{label:"High Pollution",effects:"Everyone can feel the negative impact of air pollution on their health; particularly sensitive people can experience serious problems.",recommendation:"Elderly people, children, pregnant women and people suffering from heart disease, asthma or other respiratory diseases should avoid being outdoors. Everyone else, especially children, should limit their outdoor activities."},5:{label:"Very High Pollution",effects:"An emergency situation with the impact of pollution on human health. All population groups are at risk of health deterioration.",recommendation:"Elderly people, children, pregnant women and people suffering from heart disease, asthma or other respiratory diseases should avoid even a short stay outdoors. Everyone else, especially children, should avoid being outdoors."},6:{label:"Climate Catastrophe",effects:"Catastrophic health hazard: There may be serious consequences for human health.",recommendation:"All groups of the population should avoid even a short stay in the open air."},7:{label:"Death and Destruction",effects:"Catastrophic health hazard: serious consequences for human health.",recommendation:"All population groups are advised to stay indoors with filtered air. In the open air, it is necessary to use respirators."}},d={selector_label:"Choose the AQI calculation method",options:{daily:"Average per day",hourly:"Instant"},toggle_recommendations_label:"Display recommendations in case of environmental pollution.",toggle_first_recommendation:"Display recommendations at the lowest AQI level."},c={title:"Malfunction",invalid_configuration:"Invalid Configuration",integration_not_provide_states:"Integration does not provide data. Check if Air Quality integration is active. Or delete the integration card from the control panel.",invalid_sensor:"Sensor {sensorName} not found"},u={card_name:a,air_quality_index:r,air_quality_index_instant:n,recommendation:o,health_effects:s,aqi_levels:l,config:d,error:c},h="Качество Воздуха",p="Индекс качества воздуха (AQI)",m="Индекс качества воздуха (AQI Instant)",f="Рекомендации:",_="Влияние на здоровье:",g={1:{label:"Воздух в Норме",effects:"Качество воздуха считается хорошим. Загрязнение воздуха не представляет опасности для здоровья.",recommendation:"Нет"},2:{label:"Небольшое Загрязнение",effects:"Качество воздуха в целом является приемлемым, однако некоторые загрязняющие вещества могут представлять опасность для людей, особо чувствительных к загрязнению воздуха.",recommendation:"Пожилым людям, детям, беременным женщинам и людям, страдающим болезнями сердца, астмой или другими респираторными заболеваниями, следует ограничить пребывание на открытом воздухе."},3:{label:"Повышенное Загрязнение",effects:"Люди, чувствительные к загрязнению воздуха, могут испытывать негативное воздействие загрязняющих веществ. Для основной массы населения загрязнение воздуха не оказывает заметного влияния на здоровье.",recommendation:"Пожилым людям, детям, беременным женщинам и людям, страдающим болезнями сердца, астмой или другими респираторными заболеваниями, следует существенно ограничить пребывание на открытом воздухе."},4:{label:"Высокое Загрязнение",effects:"Каждый человек может ощутить негативное влияние загрязнения воздуха на свое здоровье; особо чувствительные люди могут испытывать серьезные проблемы.",recommendation:"Пожилым людям, детям, беременным женщинам и людям, страдающим болезнями сердца, астмой или другими респираторными заболеваниями, следует избегать пребывания на открытом воздухе. Все остальные, особенно дети, должны ограничить пребывание на открытом воздухе."},5:{label:"Ужасно Задымлено",effects:"Чрезвычайная ситуация с воздействием загрязнения на здоровье человека. Все группы населения подвержены риску ухудшения здоровья.",recommendation:"Пожилым людям, детям, беременным женщинам и людям, страдающим болезнями сердца, астмой или другими респираторными заболеваниями, следует избегать даже кратковременного пребывания на открытом воздухе. Все остальные, особенно дети, должны избегать пребывания на открытом воздухе."},6:{label:"Климатическая Катастрофа",effects:"Катастрофическая опасность для здоровья: могут возникнуть серьезные последствия для здоровья человека.",recommendation:"Всем группам населения следует избегать даже кратковременного пребывания на открытом воздухе."},7:{label:"Смерть и Разрушение",effects:"Катастрофическая опасность для здоровья: серьезные последствия для здоровья человека.",recommendation:"Всем группам населения рекомендуется оставаться в помещениях с отфильтрованным воздухом. На открытом воздухе необходимо пользоваться респираторами."}},v={selector_label:"Выберите способ расчета AQI",options:{daily:"Средний за сутки",hourly:"В реальном времени"},toggle_recommendations_label:"Показывать рекомендации при загрязнении окружающей среды.",toggle_first_recommendation:"Показывать рекомендации при самом низком уровне AQI."},y={title:"Оно Сломалось",invalid_configuration:"Ошибка в конфигурации",integration_not_provide_states:"Интеграция не предоставляет данные. Проверьте, активна ли  интеграция Air Quality. Или удалите карточку интеграции с панели управления.",invalid_sensor:"Датчик {sensorName} не найден"},b={card_name:h,air_quality_index:p,air_quality_index_instant:m,recommendation:f,health_effects:_,aqi_levels:g,config:v,error:y};const q={en:Object.freeze({__proto__:null,card_name:a,air_quality_index:r,air_quality_index_instant:n,recommendation:o,health_effects:s,aqi_levels:l,config:d,error:c,default:u}),ru:Object.freeze({__proto__:null,card_name:h,air_quality_index:p,air_quality_index_instant:m,recommendation:f,health_effects:_,aqi_levels:g,config:v,error:y,default:b})};function w(e,t){if("string"==typeof t)return t;const i=e.split("."),[a,...r]=i,n=t[a];return n&&"string"!=typeof n?w(r&&r.length>0?r.join("."):"",n):n}function x(e,t="",i=""){const a=function(){var e;let t=null===(e=localStorage.getItem("selectedLanguage"))||void 0===e?void 0:e.replace(/['"]+/g,"").replace("-","_");return"null"===t&&(t=void 0),t||(t=localStorage.getItem("i18nextLng")),t&&"null"!==t||(t="en"),t}();let r;try{r=Object.assign({},q[a])}catch(e){r=Object.assign({},q.en)}let n=w(e,r);return void 0===n&&(n=w(e,Object.assign({},q.en))),n&&""!==t&&""!==i&&(n=n.replace(`{${t}}`,i)),null!=n?n:""}var I;function E(e){return e>500?I.SEVENTH:e>300?I.SIXTH:e>200?I.FIFTH:e>150?I.FOURTH:e>100?I.THIRD:e>50?I.SECOND:I.FIRST}function S(e,t,i,a){a=a||{},i=null==i?{}:i;const r=new Event(t,{bubbles:void 0===a.bubbles||a.bubbles,cancelable:Boolean(a.cancelable),composed:void 0===a.composed||a.composed});return r.detail=i,e.dispatchEvent(r),r}!function(e){e[e.FIRST=1]="FIRST",e[e.SECOND=2]="SECOND",e[e.THIRD=3]="THIRD",e[e.FOURTH=4]="FOURTH",e[e.FIFTH=5]="FIFTH",e[e.SIXTH=6]="SIXTH",e[e.SEVENTH=7]="SEVENTH"}(I||(I={}));class T extends e{constructor(){super(...arguments),this._states=new Map}static get styles(){return(e=>e`
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

    .loading {
      padding: 20px 0;
      text-align: center;
    }

    .aqi-btn-content {
      height: 64px;
      width: 100%;
      text-align: left;
      cursor: pointer;
      border: none;
      outline: none;
      background: transparent;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    .aqi-btn-content .image {
      min-width: 64px;
      margin-right: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .aqi-btn-content .info {
      margin-right: auto;
    }

    .aqi-btn-content .info .title {
      color: var(--ha-card-header-color, --primary-text-color);
      font-family: var(--ha-card-header-font-family, inherit);
      font-size: var(--ha-card-header-font-size, 20px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 1.2;
    }

    .aqi-btn-content .info .aqi-state {
      margin-top: 6px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: var(--secondary-text-color);
      font-size: 14px;
      line-height: 1;
    }

    .aqi-btn-content .info .aqi-state b {
      color: var(--primary-text-color);
      font-weight: 500;
    }

    .readings {
      margin: 16px -10px;
      display: flex;
      flex-direction: row;
      align-items: stretch;
      justify-content: space-around;
    }

    .readings .sensor-btn {
      width: 78px;
      padding: 0;
      cursor: pointer;
      border: none;
      outline: none;
      background: transparent;
      text-align: center;
      display: block;
    }

    .readings .sensor-btn .label {
      height: 20px;
      margin-bottom: 6px;
      color: var(--secondary-text-color);
      font-size: 13px;
      font-weight: 400;
      line-height: 20px;
      white-space: nowrap;
    }

    .readings .sensor-btn .icon img {
      width: 40px;
      height: 40px;
    }

    .readings .sensor-btn .value {
      height: 20px;
      margin-top: 6px;
      font-size: 13px;
      line-height: 20px;
      white-space: nowrap;
    }

    .recommendation {
      padding-top: 1px;
    }

    .recommendation .title {
      margin: 14px 0 4px;
      color: var(--primary-text-color);
      font-size: 16px;
      font-weight: normal;
    }

    .recommendation .paragraph {
      color: var(--secondary-text-color);
    }

    .error-card {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .error-card .title {
      padding: 14px 0 28px;
      font-size: 26px;
      text-align: left;
    }

    .error-card .icon {
      text-align: center;
    }

    .error-card .icon img {
      width: 100px;
      height: 100px;
    }

    .error-card .message {
      padding: 18px 10px 6px;
      text-align: center;
      font-size: 16px;
    }
  `)(i)}static get properties(){return{hass:{},config:{}}}static async getConfigElement(){return await import("./air-quality-config-8df182aa.js"),document.createElement("air-quality-config")}static getStubConfig(){return{aqi_type:"daily",enable_recommendation:!0,display_first_recommendation:!1}}setConfig(e){if(!e)throw new Error(x("error.invalid_configuration"));e.test_gui&&function(){let e=document.querySelector("home-assistant");if(e=e&&e.shadowRoot,e=e&&e.querySelector("home-assistant-main"),e=e&&e.shadowRoot,e=e&&e.querySelector("app-drawer-layout partial-panel-resolver"),e=e&&e.shadowRoot||e,e=e&&e.querySelector("ha-panel-lovelace"),e=e&&e.shadowRoot,e=e&&e.querySelector("hui-root"),e){const t=e.lovelace;return t.current_view=e.___curView,t}return null}().setEditMode(!0),this.config=Object.assign({aqi_type:"daily",enable_recommendation:!0,display_first_recommendation:!1},e)}getCardSize(){return 3}shouldUpdate(e){var t;if(!this.config||!this.hass)return!1;if(!this._entitiesIds)try{this._entitiesIds=function(e){const t=Object.keys(e.entities).filter((t=>"air_quality"===e.entities[t].platform));if(7!==t.length)throw new Error(x("error.integration_not_provide_states"));const i=new Map,a=t.find((e=>/^sensor\.air_quality_aqi_?(?<!instant)$/.test(e)));if(!a)throw new Error(x("error.invalid_sensor","sensorName","sensor.air_quality_aqi"));i.set("aqi",a);const r=t.find((e=>e.startsWith("sensor.air_quality_aqi_instant")));if(!r)throw new Error(x("error.invalid_sensor","sensorName","sensor.air_quality_aqi_instant"));i.set("aqi_instant",r);const n=t.find((e=>e.startsWith("sensor.air_quality_pm_2_5")));if(!n)throw new Error(x("error.invalid_sensor","sensorName","sensor.air_quality_pm_2_5"));i.set("pm_2_5",n);const o=t.find((e=>e.startsWith("sensor.air_quality_pm_10")));if(!o)throw new Error(x("error.invalid_sensor","sensorName","sensor.air_quality_pm_10"));i.set("pm_10",o);const s=t.find((e=>e.startsWith("sensor.air_quality_temperature")));if(!s)throw new Error(x("error.invalid_sensor","sensorName","sensor.air_quality_temperature"));i.set("temperature",s);const l=t.find((e=>e.startsWith("sensor.air_quality_humidity")));if(!l)throw new Error(x("error.invalid_sensor","sensorName","sensor.air_quality_humidity"));i.set("humidity",l);const d=t.find((e=>e.startsWith("sensor.air_quality_pressure")));if(!d)throw new Error(x("error.invalid_sensor","sensorName","sensor.air_quality_pressure"));return i.set("pressure",d),i}(this.hass)}catch(e){return this._errorMessage=e.message,!0}let i=!1;if(e.has("hass"))for(const e of this._entitiesIds.keys()){const a=this._entitiesIds.get(e),r=null===(t=this.hass.states[a])||void 0===t?void 0:t.state;this._states.get(e)!==r&&(this._states.set(e,r),i=!0)}return e.has("config")&&(i=!0),i}render(){if(this._errorMessage)return t`
        <ha-card>
          <div class="error-card">
            <div class="title">
              <span>${x("error.title")}</span>
            </div>
            <div class="icon">
              <img src="/air-quality/broken.svg" alt="Error" />
            </div>
            <div class="message">${this._errorMessage}</div>
          </div>
        </ha-card>
      `;const e=this._getState("aqi");return void 0===e?t`
        <ha-card>
          <div class="loading">
            <ha-circular-progress active></ha-circular-progress>
          </div>
        </ha-card>
      `:t`
      <ha-card>
        ${this._renderHeaderBlock(e)}
        <slot name="header"></slot>
        ${this._renderEntitiesBlock()}
        <slot name="entities"></slot>
        ${this._renderRecommendationBlock(e)}
        <slot></slot>
      </ha-card>
    `}_renderHeaderBlock(e){const i=E(e);return t`
      <button type="button" class="aqi-btn-content" @click="${()=>this._displayDetailEntityInfo("aqi")}">
        <div class="image">
          <img src="${function(e){switch(e){case I.FIRST:return"/air-quality/level-good.svg";case I.SECOND:return"/air-quality/level-moderate.svg";case I.THIRD:return"/air-quality/level-increased.svg";case I.FOURTH:return"/air-quality/level-high.svg";case I.FIFTH:case I.SIXTH:case I.SEVENTH:return"/air-quality/level-very-high.svg"}}(i)}" alt="AQI Level Icon" width="50" height="50" />
        </div>
        <div class="info">
          <div class="title">${x(`aqi_levels.${i}.label`)}</div>
          <div class="aqi-state">${"daily"===this.config.aqi_type?x("air_quality_index"):x("air_quality_index_instant")}: <b>${e}</b></div>
        </div>
      </button>
    `}_renderEntitiesBlock(){var e,i,a,r,n,o;return t`
      <div class="readings">
        <button type="button" class="sensor-btn" @click=${()=>this._displayDetailEntityInfo("pm_2_5")}>
          <div class="label">PM<sub>2.5</sub></div>
          <div class="icon">
            <img src="/air-quality/pm-2-5.svg" alt="PM2.5" />
          </div>
          <div class="value">${null!==(e=this._getState("pm_2_5"))&&void 0!==e?e:""} µg/m³</div>
        </button>
        <button type="button" class="sensor-btn" @click=${()=>this._displayDetailEntityInfo("pm_10")}>
          <div class="label">PM<sub>10</sub></div>
          <div class="icon">
            <img src="/air-quality/pm-10.svg" alt="PM10" />
          </div>
          <div class="value">${null!==(i=this._getState("pm_10"))&&void 0!==i?i:""} µg/m³</div>
        </button>
        <button type="button" class="sensor-btn" @click=${()=>this._displayDetailEntityInfo("temperature")}>
          <div class="label">Temperature</div>
          <div class="icon">
            <img src="/air-quality/temperature.svg" alt="Temperature" />
          </div>
          <div class="value">${null!==(a=this._getState("temperature"))&&void 0!==a?a:""} °C</div>
        </button>
        <button type="button" class="sensor-btn" @click=${()=>this._displayDetailEntityInfo("humidity")}>
          <div class="label">Humidity</div>
          <div class="icon">
            <img src="/air-quality/humidity.svg" alt="Humidity" />
          </div>
          <div class="value">${null!==(r=this._getState("humidity"))&&void 0!==r?r:""} %</div>
        </button>
        <button type="button" class="sensor-btn" @click=${()=>this._displayDetailEntityInfo("pressure")}>
          <div class="label">Pressure</div>
          <div class="icon">
            <img src="/air-quality/pressure.svg" alt="Pressure" />
          </div>
          <div class="value">${null!==(o=null===(n=this._getState("pressure"))||void 0===n?void 0:n.toFixed(0))&&void 0!==o?o:""} mmHg</div>
        </button>
      </div>
    `}_renderRecommendationBlock(e){var i,a;if(!(null===(i=this.config)||void 0===i?void 0:i.enable_recommendation))return;const r=(null===(a=this.config)||void 0===a?void 0:a.display_first_recommendation)?0:1,n=E(e);return n<=r?void 0:t`
      <div class="recommendation">
        <div class="title">${x("health_effects")}</div>
        <div class="paragraph">${x(`aqi_levels.${n}.effects`)}</div>
        <div class="title">${x("recommendation")}</div>
        <div class="paragraph">${x(`aqi_levels.${n}.recommendation`)}</div>
      </div>
    `}_getEntityId(e){var t;if(this._entitiesIds)return"aqi"===e?"daily"===(null===(t=this.config)||void 0===t?void 0:t.aqi_type)?this._entitiesIds.get("aqi"):this._entitiesIds.get("aqi_instant"):this._entitiesIds.get(e)}_getState(e){const t=this._states.get(e);if(!t||"unknown"===t)return;const i=Number(t);return isNaN(i)?void 0:i}_displayDetailEntityInfo(e){const t=this._getEntityId(e);t&&S(this,"hass-more-info",{entityId:t})}}window.customElements.define("air-quality-card",T),window.customCards=window.customCards||[],window.customCards.push({type:"air-quality-card",name:x("card_name"),description:"Displays the readings of the weather station sensors. Provided by Air Quality integration.",preview:!0,configurable:!0});export{T as A,e as L,i as c,S as f,t as h,x as t};
