const LitElement = Object.getPrototypeOf(customElements.get("home-assistant-main"));
const { html, css } = LitElement.prototype;
var DangerLevel = /* @__PURE__ */ ((DangerLevel2) => {
  DangerLevel2[DangerLevel2["FIRST"] = 1] = "FIRST";
  DangerLevel2[DangerLevel2["SECOND"] = 2] = "SECOND";
  DangerLevel2[DangerLevel2["THIRD"] = 3] = "THIRD";
  DangerLevel2[DangerLevel2["FOURTH"] = 4] = "FOURTH";
  DangerLevel2[DangerLevel2["FIFTH"] = 5] = "FIFTH";
  DangerLevel2[DangerLevel2["SIXTH"] = 6] = "SIXTH";
  DangerLevel2[DangerLevel2["SEVENTH"] = 7] = "SEVENTH";
  return DangerLevel2;
})(DangerLevel || {});
var CardSize = /* @__PURE__ */ ((CardSize2) => {
  CardSize2["SM"] = "sm";
  CardSize2["MD"] = "md";
  return CardSize2;
})(CardSize || {});
const card_name$1 = "Air Quality";
const air_quality_index$1 = "Air quality index";
const air_quality_index_instant$1 = "Air quality index";
const recommendation$1 = "Recommendation:";
const health_effects$1 = "Health effects:";
const aqi_levels$1 = {
  "1": {
    label: "The Air is Clean",
    effects: "The air quality is considered good. Air pollution does not pose a health hazard.",
    recommendation: "Nope"
  },
  "2": {
    label: "Moderate Pollution",
    effects: "The air quality is generally acceptable, but some pollutants may pose a danger to people who are particularly sensitive to air pollution.",
    recommendation: "Elderly people, children, pregnant women and people suffering from heart disease, asthma or other respiratory diseases should limit outdoor activities."
  },
  "3": {
    label: "Increased Pollution",
    effects: "People who are sensitive to air pollution may experience negative effects of pollutants. For the majority of the population, air pollution does not have a noticeable effect on health.",
    recommendation: "Elderly people, children, pregnant women and people suffering from heart disease, asthma or other respiratory diseases should significantly limit outdoor activities."
  },
  "4": {
    label: "High Pollution",
    effects: "Everyone can feel the negative impact of air pollution on their health; particularly sensitive people can experience serious problems.",
    recommendation: "Elderly people, children, pregnant women and people suffering from heart disease, asthma or other respiratory diseases should avoid being outdoors. Everyone else, especially children, should limit their outdoor activities."
  },
  "5": {
    label: "Very High Pollution",
    effects: "An emergency situation with the impact of pollution on human health. All population groups are at risk of health deterioration.",
    recommendation: "Elderly people, children, pregnant women and people suffering from heart disease, asthma or other respiratory diseases should avoid even a short stay outdoors. Everyone else, especially children, should avoid being outdoors."
  },
  "6": {
    label: "Climate Catastrophe",
    effects: "Catastrophic health hazard: There may be serious consequences for human health.",
    recommendation: "All groups of the population should avoid even a short stay in the open air."
  },
  "7": {
    label: "Death and Destruction",
    effects: "Catastrophic health hazard: serious consequences for human health.",
    recommendation: "All population groups are advised to stay indoors with filtered air. In the open air, it is necessary to use respirators."
  }
};
const config$1 = {
  selector_label: "Choose the AQI calculation method",
  options: {
    daily: "Average per day",
    hourly: "Instant"
  },
  toggle_recommendations_label: "Display recommendations in case of environmental pollution.",
  toggle_first_recommendation: "Display recommendations at the lowest AQI level."
};
const error$1 = {
  title: "Malfunction",
  invalid_configuration: "Invalid Configuration",
  integration_not_provide_states: "Integration does not provide data. Check if Air Quality integration is active. Or delete the integration card from the control panel.",
  invalid_sensor: "Sensor {sensorName} not found"
};
const en = {
  card_name: card_name$1,
  air_quality_index: air_quality_index$1,
  air_quality_index_instant: air_quality_index_instant$1,
  recommendation: recommendation$1,
  health_effects: health_effects$1,
  aqi_levels: aqi_levels$1,
  config: config$1,
  error: error$1
};
const en$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  air_quality_index: air_quality_index$1,
  air_quality_index_instant: air_quality_index_instant$1,
  aqi_levels: aqi_levels$1,
  card_name: card_name$1,
  config: config$1,
  default: en,
  error: error$1,
  health_effects: health_effects$1,
  recommendation: recommendation$1
}, Symbol.toStringTag, { value: "Module" }));
const card_name = "Качество Воздуха";
const air_quality_index = "Индекс качества воздуха";
const air_quality_index_instant = "Индекс качества воздуха";
const recommendation = "Рекомендации:";
const health_effects = "Влияние на здоровье:";
const aqi_levels = {
  "1": {
    label: "Воздух в Норме",
    effects: "Качество воздуха считается хорошим. Загрязнение воздуха не представляет опасности для здоровья.",
    recommendation: "Нет"
  },
  "2": {
    label: "Небольшое Загрязнение",
    effects: "Качество воздуха в целом является приемлемым, однако некоторые загрязняющие вещества могут представлять опасность для людей, особо чувствительных к загрязнению воздуха.",
    recommendation: "Пожилым людям, детям, беременным женщинам и людям, страдающим болезнями сердца, астмой или другими респираторными заболеваниями, следует ограничить пребывание на открытом воздухе."
  },
  "3": {
    label: "Повышенное Загрязнение",
    effects: "Люди, чувствительные к загрязнению воздуха, могут испытывать негативное воздействие загрязняющих веществ. Для основной массы населения загрязнение воздуха не оказывает заметного влияния на здоровье.",
    recommendation: "Пожилым людям, детям, беременным женщинам и людям, страдающим болезнями сердца, астмой или другими респираторными заболеваниями, следует существенно ограничить пребывание на открытом воздухе."
  },
  "4": {
    label: "Высокое Загрязнение",
    effects: "Каждый человек может ощутить негативное влияние загрязнения воздуха на свое здоровье; особо чувствительные люди могут испытывать серьезные проблемы.",
    recommendation: "Пожилым людям, детям, беременным женщинам и людям, страдающим болезнями сердца, астмой или другими респираторными заболеваниями, следует избегать пребывания на открытом воздухе. Все остальные, особенно дети, должны ограничить пребывание на открытом воздухе."
  },
  "5": {
    label: "Ужасно Задымлено",
    effects: "Чрезвычайная ситуация с воздействием загрязнения на здоровье человека. Все группы населения подвержены риску ухудшения здоровья.",
    recommendation: "Пожилым людям, детям, беременным женщинам и людям, страдающим болезнями сердца, астмой или другими респираторными заболеваниями, следует избегать даже кратковременного пребывания на открытом воздухе. Все остальные, особенно дети, должны избегать пребывания на открытом воздухе."
  },
  "6": {
    label: "Климатическая Катастрофа",
    effects: "Катастрофическая опасность для здоровья: могут возникнуть серьезные последствия для здоровья человека.",
    recommendation: "Всем группам населения следует избегать даже кратковременного пребывания на открытом воздухе."
  },
  "7": {
    label: "Смерть и Разрушение",
    effects: "Катастрофическая опасность для здоровья: серьезные последствия для здоровья человека.",
    recommendation: "Всем группам населения рекомендуется оставаться в помещениях с отфильтрованным воздухом. На открытом воздухе необходимо пользоваться респираторами."
  }
};
const config = {
  selector_label: "Выберите способ расчета AQI",
  options: {
    daily: "Средний за сутки",
    hourly: "В реальном времени"
  },
  toggle_recommendations_label: "Показывать рекомендации при загрязнении окружающей среды.",
  toggle_first_recommendation: "Показывать рекомендации при самом низком уровне AQI."
};
const error = {
  title: "Оно Сломалось",
  invalid_configuration: "Ошибка в конфигурации",
  integration_not_provide_states: "Интеграция не предоставляет данные. Проверьте, активна ли  интеграция Air Quality. Или удалите карточку интеграции с панели управления.",
  invalid_sensor: "Датчик {sensorName} не найден"
};
const ru = {
  card_name,
  air_quality_index,
  air_quality_index_instant,
  recommendation,
  health_effects,
  aqi_levels,
  config,
  error
};
const ru$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  air_quality_index,
  air_quality_index_instant,
  aqi_levels,
  card_name,
  config,
  default: ru,
  error,
  health_effects,
  recommendation
}, Symbol.toStringTag, { value: "Module" }));
const translations = {
  en: en$1,
  ru: ru$1
};
function translateString(string, translatedStrings) {
  if (typeof translatedStrings === "string") {
    return translatedStrings;
  }
  const splitted = string.split(".");
  const [key, ...otherKeys] = splitted;
  const translated = translatedStrings[key];
  if (!translated || typeof translated === "string") {
    return translated;
  }
  return translateString(otherKeys && otherKeys.length > 0 ? otherKeys.join(".") : "", translated);
}
function language() {
  var _a;
  let lang = (_a = localStorage.getItem("selectedLanguage")) == null ? void 0 : _a.replace(/['"]+/g, "").replace("-", "_");
  if (lang === "null") {
    lang = void 0;
  }
  if (!lang) {
    lang = localStorage.getItem("i18nextLng");
  }
  if (!lang || lang === "null") {
    lang = "en";
  }
  return lang;
}
function t(string, search = "", replace = "") {
  const lang = language();
  let translatedStrings;
  try {
    translatedStrings = { ...translations[lang] };
  } catch (e) {
    translatedStrings = { ...translations["en"] };
  }
  let translated = translateString(string, translatedStrings);
  if (translated === void 0) {
    translated = translateString(string, { ...translations["en"] });
  }
  if (translated && search !== "" && replace !== "") {
    translated = translated.replace(`{${search}}`, replace);
  }
  return translated ?? "";
}
function aqiToDangerLevel(aqi) {
  if (aqi > 500) {
    return DangerLevel.SEVENTH;
  }
  if (aqi > 300) {
    return DangerLevel.SIXTH;
  }
  if (aqi > 200) {
    return DangerLevel.FIFTH;
  }
  if (aqi > 150) {
    return DangerLevel.FOURTH;
  }
  if (aqi > 100) {
    return DangerLevel.THIRD;
  }
  if (aqi > 50) {
    return DangerLevel.SECOND;
  }
  return DangerLevel.FIRST;
}
function getIconOfDangerLevel(level) {
  switch (level) {
    case DangerLevel.FIRST:
      return "/air_quality_files/level-good.svg";
    case DangerLevel.SECOND:
      return "/air_quality_files/level-moderate.svg";
    case DangerLevel.THIRD:
      return "/air_quality_files/level-increased.svg";
    case DangerLevel.FOURTH:
      return "/air_quality_files/level-high.svg";
    case DangerLevel.FIFTH:
      return "/air_quality_files/level-very-high.svg";
    case DangerLevel.SIXTH:
      return "/air_quality_files/level-very-high.svg";
    case DangerLevel.SEVENTH:
      return "/air_quality_files/level-very-high.svg";
  }
}
function getEntitiesIds(hass) {
  const ids = Object.keys(hass.entities).filter((id) => hass.entities[id].platform === "air_quality");
  if (ids.length < 7) {
    throw new Error(t("error.integration_not_provide_states"));
  }
  const entitiesIds = /* @__PURE__ */ new Map();
  const aqiEntityId = ids.find((id) => new RegExp("^sensor\\.air_quality_aqi_?(?<!instant)$").test(id));
  if (!aqiEntityId) throw new Error(t("error.invalid_sensor", "sensorName", "sensor.air_quality_aqi"));
  entitiesIds.set("aqi", aqiEntityId);
  const aqiInstantEntityId = ids.find((id) => id.startsWith("sensor.air_quality_aqi_instant"));
  if (!aqiInstantEntityId) throw new Error(t("error.invalid_sensor", "sensorName", "sensor.air_quality_aqi_instant"));
  entitiesIds.set("aqi_instant", aqiInstantEntityId);
  const pm25EntityId = ids.find((id) => id.startsWith("sensor.air_quality_pm_2_5"));
  if (!pm25EntityId) throw new Error(t("error.invalid_sensor", "sensorName", "sensor.air_quality_pm_2_5"));
  entitiesIds.set("pm_2_5", pm25EntityId);
  const pm10EntityId = ids.find((id) => id.startsWith("sensor.air_quality_pm_10"));
  if (!pm10EntityId) throw new Error(t("error.invalid_sensor", "sensorName", "sensor.air_quality_pm_10"));
  entitiesIds.set("pm_10", pm10EntityId);
  const temperatureEntityId = ids.find((id) => id.startsWith("sensor.air_quality_temperature"));
  if (!temperatureEntityId) throw new Error(t("error.invalid_sensor", "sensorName", "sensor.air_quality_temperature"));
  entitiesIds.set("temperature", temperatureEntityId);
  const humidityEntityId = ids.find((id) => id.startsWith("sensor.air_quality_humidity"));
  if (!humidityEntityId) throw new Error(t("error.invalid_sensor", "sensorName", "sensor.air_quality_humidity"));
  entitiesIds.set("humidity", humidityEntityId);
  const pressureEntityId = ids.find((id) => id.startsWith("sensor.air_quality_pressure"));
  if (!pressureEntityId) throw new Error(t("error.invalid_sensor", "sensorName", "sensor.air_quality_pressure"));
  entitiesIds.set("pressure", pressureEntityId);
  return entitiesIds;
}
function getLovelace() {
  let root = document.querySelector("home-assistant");
  root = root && root.shadowRoot;
  root = root && root.querySelector("home-assistant-main");
  root = root && root.shadowRoot;
  root = root && root.querySelector("app-drawer-layout partial-panel-resolver");
  root = root && root.shadowRoot || root;
  root = root && root.querySelector("ha-panel-lovelace");
  root = root && root.shadowRoot;
  root = root && root.querySelector("hui-root");
  if (root) {
    const ll = root.lovelace;
    ll.current_view = root.___curView;
    return ll;
  }
  return null;
}
function fireEvent(node, type, detail, options) {
  options = options || {};
  detail = detail === null || detail === void 0 ? {} : detail;
  const event = new Event(type, {
    bubbles: options.bubbles === void 0 ? true : options.bubbles,
    cancelable: Boolean(options.cancelable),
    composed: options.composed === void 0 ? true : options.composed
  });
  event.detail = detail;
  node.dispatchEvent(event);
  return event;
}
const styles$1 = css`:host {
  font-family: var(--paper-font-body1_-_font-family);
  -webkit-font-smoothing: var(--paper-font-body1_-_-webkit-font-smoothing);
  font-size: var(--paper-font-body1_-_font-size);
  font-weight: var(--paper-font-body1_-_font-weight);
  line-height: var(--paper-font-body1_-_line-height);
  color: var(--primary-text-color);
}

.main-card.card-sm .hide-sm {
  display: none;
}

.main-card {
  padding: 16px;
}
.main-card .aqi-btn-content {
  height: 64px;
  width: 100%;
  padding: 0;
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
.main-card .aqi-btn-content .image {
  width: 64px;
  min-width: 64px;
  height: 64px;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.main-card .aqi-btn-content .info {
  max-width: calc(100% - 80px);
  margin-right: auto;
}
.main-card .aqi-btn-content .info .title {
  color: inherit;
  font-family: inherit;
  font-size: var(--ha-card-header-font-size, 24px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.2;
}
.main-card .aqi-btn-content .info .aqi-state {
  margin-top: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--secondary-text-color);
  font-size: 13px;
  line-height: 1;
}
.main-card .aqi-btn-content .info .aqi-state .short-label:before {
  content: "(";
}
.main-card .aqi-btn-content .info .aqi-state .short-label:after {
  content: "):";
}
.main-card .aqi-btn-content .info .aqi-state b {
  color: var(--primary-text-color);
  font-weight: 500;
  font-size: 18px;
}
.main-card .readings {
  margin: 16px -10px;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-around;
}
.main-card .readings .sensor-btn {
  width: 78px;
  padding: 0;
  cursor: pointer;
  border: none;
  outline: none;
  background: transparent;
  text-align: center;
  display: block;
}
.main-card .readings .sensor-btn .label {
  height: 20px;
  max-width: 100%;
  padding: 0 2px;
  margin-bottom: 6px;
  color: var(--secondary-text-color);
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.main-card .readings .sensor-btn .icon img {
  width: 40px;
  height: 40px;
}
.main-card .readings .sensor-btn .value {
  height: 20px;
  margin-top: 6px;
  font-size: 13px;
  line-height: 20px;
  white-space: nowrap;
}
.main-card .recommendation {
  padding-top: 1px;
}
.main-card .recommendation .title {
  margin: 14px 0 4px;
  color: var(--primary-text-color);
  font-size: 16px;
  font-weight: normal;
}
.main-card .recommendation .paragraph {
  color: var(--secondary-text-color);
}
.main-card.card-sm .aqi-btn-content .info .title {
  font-size: var(--ha-card-header-font-size, 22px);
}
.main-card.card-sm .aqi-btn-content .info .aqi-state {
  margin-top: 5px;
}
.main-card.card-sm .aqi-btn-content .info .aqi-state .short-label:before {
  content: "";
}
.main-card.card-sm .aqi-btn-content .info .aqi-state .short-label:after {
  content: ":";
}
.main-card.card-sm .aqi-btn-content .info .aqi-state b {
  font-size: 16px;
}
.main-card.card-sm .readings .sensor-btn .label {
  font-size: 12px;
}
.main-card.card-sm .readings .sensor-btn .icon img {
  height: 36px;
  width: 36px;
}
.main-card.card-sm .readings .sensor-btn .value {
  height: 40px;
  margin-top: 8px;
}
.main-card.card-sm .readings .sensor-btn .value > span {
  text-align: center;
  display: block;
}
.main-card.card-sm .readings .sensor-btn .value span:first-child {
  font-size: 16px;
}
.main-card.card-sm .readings .sensor-btn .value span:last-child {
  font-size: 12px;
  line-height: 16px;
  color: var(--secondary-text-color);
}
.main-card.card-sm .recommendation .title {
  font-size: 14px;
}
.main-card.card-sm .recommendation .paragraph {
  font-size: 13px;
  line-height: 17px;
}

.loading-card {
  padding: 20px 0;
  text-align: center;
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
}`;
const _AirQualityCard = class _AirQualityCard extends LitElement {
  constructor() {
    super(...arguments);
    this.size = CardSize.MD;
    this._states = /* @__PURE__ */ new Map();
  }
  static get properties() {
    return {
      hass: {},
      config: { attribute: false },
      size: { state: true, type: String }
    };
  }
  static async getConfigElement() {
    await Promise.resolve().then(() => airQualityConfig);
    return document.createElement("air-quality-config");
  }
  static getStubConfig() {
    return {
      aqi_type: "daily",
      enable_recommendation: true,
      display_first_recommendation: false
    };
  }
  setConfig(config2) {
    if (!config2) {
      throw new Error(t("error.invalid_configuration"));
    }
    if (config2.test_gui) {
      getLovelace().setEditMode(true);
    }
    this.config = {
      aqi_type: "daily",
      enable_recommendation: true,
      display_first_recommendation: false,
      ...config2
    };
  }
  getCardSize() {
    return 3;
  }
  shouldUpdate(changedProps) {
    var _a;
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
    if (changedProps.has("hass")) {
      for (const sensorName of this._entitiesIds.keys()) {
        const entityId = this._entitiesIds.get(sensorName);
        const stateNew = (_a = this.hass.states[entityId]) == null ? void 0 : _a.state;
        const stateOld = this._states.get(sensorName);
        if (stateOld !== stateNew) {
          this._states.set(sensorName, stateNew);
          shouldUpdate = true;
        }
      }
    }
    if (changedProps.has("config") || changedProps.has("size")) {
      shouldUpdate = true;
    }
    return shouldUpdate;
  }
  connectedCallback() {
    super.connectedCallback();
    this._handleWindowResize();
    this._resizeCallback = this._handleWindowResize.bind(this);
    window.addEventListener("resize", this._resizeCallback);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._resizeCallback) {
      window.removeEventListener("resize", this._resizeCallback);
    }
  }
  render() {
    if (this._errorMessage) {
      return html`
        <ha-card class="${`error-card card-${this.size}`}">
          <div class="title">
            <span>${t("error.title")}</span>
          </div>
          <div class="icon">
            <img src="/air_quality_files/broken.svg" alt="Error" />
          </div>
          <div class="message">${this._errorMessage}</div>
        </ha-card>
      `;
    }
    const aqi = this._getState("aqi");
    if (aqi === void 0) {
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
  _renderHeaderBlock(aqi) {
    const dangerLevel = aqiToDangerLevel(aqi);
    return html`
      <button type="button" class="aqi-btn-content" @click="${() => this._displayDetailEntityInfo("aqi")}">
        <div class="image">
          <img src="${getIconOfDangerLevel(dangerLevel)}" alt="AQI Level Icon" width="50" height="50" />
        </div>
        <div class="info">
          <div class="title">${t(`aqi_levels.${dangerLevel}.label`)}</div>

          <div class="aqi-state">
            <span class="hide-sm">${this.config.aqi_type === "daily" ? t("air_quality_index") : t("air_quality_index_instant")}</span>
            <span class="short-label">${this.config.aqi_type === "daily" ? "AQI" : "AQI Instant"}</span>
            <b>${aqi}</b>
          </div>
        </div>
      </button>
    `;
  }
  _renderEntitiesBlock() {
    var _a;
    return html`
      <div class="readings">
        <button type="button" class="sensor-btn" @click="${() => this._displayDetailEntityInfo("pm_2_5")}">
          <div class="label">PM<sub>2.5</sub></div>
          <div class="icon">
            <img src="/air_quality_files/pm-2-5.svg" alt="PM2.5" />
          </div>
          <div class="value">
            <span>${this._getState("pm_2_5") ?? ""}</span>
            <span>µg/m³</span>
          </div>
        </button>
        <button type="button" class="sensor-btn" @click="${() => this._displayDetailEntityInfo("pm_10")}">
          <div class="label">PM<sub>10</sub></div>
          <div class="icon">
            <img src="/air_quality_files/pm-10.svg" alt="PM10" />
          </div>
          <div class="value">
            <span>${this._getState("pm_10") ?? ""}</span>
            <span>µg/m³</span>
          </div>
        </button>
        <button type="button" class="sensor-btn" @click="${() => this._displayDetailEntityInfo("temperature")}">
          <div class="label">Temperature</div>
          <div class="icon">
            <img src="/air_quality_files/temperature.svg" alt="Temperature" />
          </div>
          <div class="value">
            <span>${this._getState("temperature") ?? ""}</span>
            <span>°C</span>
          </div>
        </button>
        <button type="button" class="sensor-btn" @click="${() => this._displayDetailEntityInfo("humidity")}">
          <div class="label">Humidity</div>
          <div class="icon">
            <img src="/air_quality_files/humidity.svg" alt="Humidity" />
          </div>
          <div class="value">
            <span>${this._getState("humidity") ?? ""}</span>
            <span>%</span>
          </div>
        </button>
        <button type="button" class="sensor-btn" @click="${() => this._displayDetailEntityInfo("pressure")}">
          <div class="label">Pressure</div>
          <div class="icon">
            <img src="/air_quality_files/pressure.svg" alt="Pressure" />
          </div>
          <div class="value">
            <span>${((_a = this._getState("pressure")) == null ? void 0 : _a.toFixed(0)) ?? ""}</span>
            <span>mmHg</span>
          </div>
        </button>
      </div>
    `;
  }
  _renderRecommendationBlock(aqi) {
    var _a, _b;
    if (!((_a = this.config) == null ? void 0 : _a.enable_recommendation)) {
      return;
    }
    const displayFrom = ((_b = this.config) == null ? void 0 : _b.display_first_recommendation) ? 0 : 1;
    const aqiLevel = aqiToDangerLevel(aqi);
    if (aqiLevel <= displayFrom) {
      return;
    }
    return html`
      <div class="recommendation">
        <div class="title">${t("health_effects")}</div>
        <div class="paragraph">${t(`aqi_levels.${aqiLevel}.effects`)}</div>
        <div class="title">${t("recommendation")}</div>
        <div class="paragraph">${t(`aqi_levels.${aqiLevel}.recommendation`)}</div>
      </div>
    `;
  }
  _handleWindowResize() {
    this.size = this.clientWidth < 400 ? CardSize.SM : CardSize.MD;
  }
  /**
   * Returns entity ID by sensor name
   * @param name
   * @private
   */
  _getEntityId(name) {
    var _a;
    if (!this._entitiesIds) {
      return void 0;
    }
    if (name === "aqi") {
      return ((_a = this.config) == null ? void 0 : _a.aqi_type) === "daily" ? this._entitiesIds.get("aqi") : this._entitiesIds.get("aqi_instant");
    } else {
      return this._entitiesIds.get(name);
    }
  }
  /**
   * Returns sensor state, by sensor name
   * @param name
   * @private
   */
  _getState(name) {
    var _a;
    if (name === "aqi" && ((_a = this.config) == null ? void 0 : _a.aqi_type) === "hourly") {
      name = "aqi_instant";
    }
    const stateRaw = this._states.get(name);
    if (!stateRaw || stateRaw === "unknown") {
      return void 0;
    }
    const state = Number(stateRaw);
    return isNaN(state) ? void 0 : state;
  }
  /**
   * Open detail info modal
   * @param sensor
   * @private
   */
  _displayDetailEntityInfo(sensor) {
    const entityId = this._getEntityId(sensor);
    if (!entityId) {
      return;
    }
    fireEvent(this, "hass-more-info", { entityId });
  }
};
_AirQualityCard.styles = styles$1;
let AirQualityCard = _AirQualityCard;
window.customElements.define("air-quality-card", AirQualityCard);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "air-quality-card",
  name: t("card_name"),
  description: "Displays the readings of the weather station sensors. Provided by Air Quality integration.",
  // supported: supportsButtonPressTileFeature, // Optional
  preview: true,
  configurable: true
  // Optional - defaults to false
});
const styles = css`:host {
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
}`;
const SCHEMA = [
  {
    name: "aqi_type",
    default: "daily",
    required: true,
    selector: {
      select: {
        multiple: false,
        custom_value: false,
        mode: "dropdown",
        options: [
          { value: "daily", label: "options.daily" },
          { value: "hourly", label: t("options.hourly") }
        ],
        translation_key: "config"
      }
    }
  },
  {
    name: "enable_recommendation",
    default: true,
    selector: {
      boolean: {}
    }
  },
  {
    name: "display_first_recommendation",
    default: false,
    selector: {
      boolean: {}
    }
  }
];
const _AirQualityConfig = class _AirQualityConfig extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {}
    };
  }
  setConfig(config2) {
    this.config = config2;
  }
  render() {
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
  _computeLabel(schema) {
    switch (schema.name) {
      case "aqi_type":
        return t("config.selector_label");
      case "enable_recommendation":
        return t("config.toggle_recommendations_label");
      case "display_first_recommendation":
        return t("config.toggle_first_recommendation");
      default:
        return void 0;
    }
  }
  _localizeValue(key) {
    return t(key);
  }
  _computeHelper(schema) {
    switch (schema.name) {
      default:
        return void 0;
    }
  }
  _valueChanged(event) {
    fireEvent(this, "config-changed", { config: event.detail.value });
  }
};
_AirQualityConfig.styles = styles;
let AirQualityConfig = _AirQualityConfig;
window.customElements.define("air-quality-config", AirQualityConfig);
const airQualityConfig = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AirQualityConfig
}, Symbol.toStringTag, { value: "Module" }));
export {
  AirQualityCard
};
