const LitElement = Object.getPrototypeOf(customElements.get('home-assistant-main'));
const { html, css } = LitElement.prototype;

var DangerLevel;
(function (DangerLevel) {
    DangerLevel[DangerLevel["FIRST"] = 1] = "FIRST";
    DangerLevel[DangerLevel["SECOND"] = 2] = "SECOND";
    DangerLevel[DangerLevel["THIRD"] = 3] = "THIRD";
    DangerLevel[DangerLevel["FOURTH"] = 4] = "FOURTH";
    DangerLevel[DangerLevel["FIFTH"] = 5] = "FIFTH";
    DangerLevel[DangerLevel["SIXTH"] = 6] = "SIXTH";
    DangerLevel[DangerLevel["SEVENTH"] = 7] = "SEVENTH";
})(DangerLevel || (DangerLevel = {}));
var CardSize;
(function (CardSize) {
    CardSize["SM"] = "sm";
    CardSize["MD"] = "md";
})(CardSize || (CardSize = {}));

var card_name$1 = "Air Quality";
var air_quality_index$1 = "Air quality index";
var air_quality_index_instant$1 = "Air quality index";
var recommendation$1 = "Recommendation:";
var health_effects$1 = "Health effects:";
var aqi_levels$1 = {
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
var config$1 = {
	selector_label: "Choose the AQI calculation method",
	options: {
		daily: "Average per day",
		hourly: "Instant"
	},
	toggle_recommendations_label: "Display recommendations in case of environmental pollution.",
	toggle_first_recommendation: "Display recommendations at the lowest AQI level."
};
var error$1 = {
	title: "Malfunction",
	invalid_configuration: "Invalid Configuration",
	integration_not_provide_states: "Integration does not provide data. Check if Air Quality integration is active. Or delete the integration card from the control panel.",
	invalid_sensor: "Sensor {sensorName} not found"
};
var en = {
	card_name: card_name$1,
	air_quality_index: air_quality_index$1,
	air_quality_index_instant: air_quality_index_instant$1,
	recommendation: recommendation$1,
	health_effects: health_effects$1,
	aqi_levels: aqi_levels$1,
	config: config$1,
	error: error$1
};

var en$1 = /*#__PURE__*/Object.freeze({
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
});

var card_name = "Качество Воздуха";
var air_quality_index = "Индекс качества воздуха";
var air_quality_index_instant = "Индекс качества воздуха";
var recommendation = "Рекомендации:";
var health_effects = "Влияние на здоровье:";
var aqi_levels = {
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
var config = {
	selector_label: "Выберите способ расчета AQI",
	options: {
		daily: "Средний за сутки",
		hourly: "В реальном времени"
	},
	toggle_recommendations_label: "Показывать рекомендации при загрязнении окружающей среды.",
	toggle_first_recommendation: "Показывать рекомендации при самом низком уровне AQI."
};
var error = {
	title: "Оно Сломалось",
	invalid_configuration: "Ошибка в конфигурации",
	integration_not_provide_states: "Интеграция не предоставляет данные. Проверьте, активна ли  интеграция Air Quality. Или удалите карточку интеграции с панели управления.",
	invalid_sensor: "Датчик {sensorName} не найден"
};
var ru = {
	card_name: card_name,
	air_quality_index: air_quality_index,
	air_quality_index_instant: air_quality_index_instant,
	recommendation: recommendation,
	health_effects: health_effects,
	aqi_levels: aqi_levels,
	config: config,
	error: error
};

var ru$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    air_quality_index: air_quality_index,
    air_quality_index_instant: air_quality_index_instant,
    aqi_levels: aqi_levels,
    card_name: card_name,
    config: config,
    default: ru,
    error: error,
    health_effects: health_effects,
    recommendation: recommendation
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const translations = {
    en: en$1,
    ru: ru$1,
};
function translateString(string, translatedStrings) {
    if (typeof translatedStrings === 'string') {
        return translatedStrings;
    }
    const splitted = string.split('.');
    const [key, ...otherKeys] = splitted;
    const translated = translatedStrings[key];
    if (!translated || typeof translated === 'string') {
        return translated;
    }
    return translateString(otherKeys && otherKeys.length > 0 ? otherKeys.join('.') : '', translated);
}
function language() {
    var _a;
    let lang = (_a = localStorage.getItem('selectedLanguage')) === null || _a === void 0 ? void 0 : _a.replace(/['"]+/g, '').replace('-', '_');
    if (lang === 'null') {
        lang = undefined;
    }
    if (!lang) {
        lang = localStorage.getItem('i18nextLng');
    }
    if (!lang || lang === 'null') {
        lang = 'en';
    }
    return lang;
}
function t(string, search = '', replace = '') {
    const lang = language();
    let translatedStrings;
    try {
        translatedStrings = Object.assign({}, translations[lang]);
    }
    catch (e) {
        translatedStrings = Object.assign({}, translations['en']);
    }
    let translated = translateString(string, translatedStrings);
    if (translated === undefined) {
        translated = translateString(string, Object.assign({}, translations['en']));
    }
    if (translated && search !== '' && replace !== '') {
        translated = translated.replace(`{${search}}`, replace);
    }
    return translated !== null && translated !== void 0 ? translated : '';
}

/**
 * AQI to the Danger Level
 * @param aqi
 */
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
/**
 * Get the icon of the danger level
 * @param level
 */
function getIconOfDangerLevel(level) {
    switch (level) {
        case DangerLevel.FIRST:
            return '/air-quality/level-good.svg';
        case DangerLevel.SECOND:
            return '/air-quality/level-moderate.svg';
        case DangerLevel.THIRD:
            return '/air-quality/level-increased.svg';
        case DangerLevel.FOURTH:
            return '/air-quality/level-high.svg';
        case DangerLevel.FIFTH:
            return '/air-quality/level-very-high.svg';
        case DangerLevel.SIXTH:
            return '/air-quality/level-very-high.svg';
        case DangerLevel.SEVENTH:
            return '/air-quality/level-very-high.svg';
    }
}
/**
 * Returns map of sensor name and entity ID
 * @param hass
 */
function getEntitiesIds(hass) {
    const ids = Object.keys(hass.entities).filter(id => hass.entities[id].platform === 'air_quality');
    if (ids.length !== 7) {
        throw new Error(t('error.integration_not_provide_states'));
    }
    const entitiesIds = new Map();
    const aqiEntityId = ids.find(id => /^sensor\.air_quality_aqi_?(?<!instant)$/.test(id));
    if (!aqiEntityId)
        throw new Error(t('error.invalid_sensor', 'sensorName', 'sensor.air_quality_aqi'));
    entitiesIds.set('aqi', aqiEntityId);
    const aqiInstantEntityId = ids.find(id => id.startsWith('sensor.air_quality_aqi_instant'));
    if (!aqiInstantEntityId)
        throw new Error(t('error.invalid_sensor', 'sensorName', 'sensor.air_quality_aqi_instant'));
    entitiesIds.set('aqi_instant', aqiInstantEntityId);
    const pm25EntityId = ids.find(id => id.startsWith('sensor.air_quality_pm_2_5'));
    if (!pm25EntityId)
        throw new Error(t('error.invalid_sensor', 'sensorName', 'sensor.air_quality_pm_2_5'));
    entitiesIds.set('pm_2_5', pm25EntityId);
    const pm10EntityId = ids.find(id => id.startsWith('sensor.air_quality_pm_10'));
    if (!pm10EntityId)
        throw new Error(t('error.invalid_sensor', 'sensorName', 'sensor.air_quality_pm_10'));
    entitiesIds.set('pm_10', pm10EntityId);
    const temperatureEntityId = ids.find(id => id.startsWith('sensor.air_quality_temperature'));
    if (!temperatureEntityId)
        throw new Error(t('error.invalid_sensor', 'sensorName', 'sensor.air_quality_temperature'));
    entitiesIds.set('temperature', temperatureEntityId);
    const humidityEntityId = ids.find(id => id.startsWith('sensor.air_quality_humidity'));
    if (!humidityEntityId)
        throw new Error(t('error.invalid_sensor', 'sensorName', 'sensor.air_quality_humidity'));
    entitiesIds.set('humidity', humidityEntityId);
    const pressureEntityId = ids.find(id => id.startsWith('sensor.air_quality_pressure'));
    if (!pressureEntityId)
        throw new Error(t('error.invalid_sensor', 'sensorName', 'sensor.air_quality_pressure'));
    entitiesIds.set('pressure', pressureEntityId);
    return entitiesIds;
}
function getLovelace() {
    let root = document.querySelector('home-assistant');
    root = root && root.shadowRoot;
    root = root && root.querySelector('home-assistant-main');
    root = root && root.shadowRoot;
    root = root && root.querySelector('app-drawer-layout partial-panel-resolver');
    root = (root && root.shadowRoot) || root;
    root = root && root.querySelector('ha-panel-lovelace');
    root = root && root.shadowRoot;
    root = root && root.querySelector('hui-root');
    if (root) {
        const ll = root.lovelace;
        ll.current_view = root.___curView;
        return ll;
    }
    return null;
}
/**
 * Dispatches a custom event with an optional detail value.
 *
 * @param node
 * @param {string} type Name of event type.
 * @param {*=} detail Detail value containing event-specific
 *   payload.
 * @param options
 *           cancelable: (boolean|undefined),
 *           composed: (boolean|undefined) }=}
 *  options Object specifying options.  These may include:
 *  `bubbles` (boolean, defaults to `true`),
 *  `cancelable` (boolean, defaults to false), and
 *  `node` on which to fire the event (HTMLElement, defaults to `this`).
 * @return {Event} The new event that was fired.
 */
function fireEvent(node, type, detail, options) {
    options = options || {};
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    detail = detail === null || detail === undefined ? {} : detail;
    const event = new Event(type, {
        bubbles: options.bubbles === undefined ? true : options.bubbles,
        cancelable: Boolean(options.cancelable),
        composed: options.composed === undefined ? true : options.composed,
    });
    event.detail = detail;
    node.dispatchEvent(event);
    return event;
}

var styles = css`:host{font-family:var(--paper-font-body1_-_font-family);-webkit-font-smoothing:var(--paper-font-body1_-_-webkit-font-smoothing);color:var(--primary-text-color);font-size:var(--paper-font-body1_-_font-size);font-weight:var(--paper-font-body1_-_font-weight);line-height:var(--paper-font-body1_-_line-height)}.main-card.card-sm .hide-sm{display:none}.main-card{padding:16px}.main-card .aqi-btn-content{align-items:center;background:transparent;border:none;cursor:pointer;display:flex;flex-direction:row;height:64px;justify-content:space-between;outline:none;padding:0;text-align:left;width:100%}.main-card .aqi-btn-content .image{align-items:center;display:flex;height:64px;justify-content:center;margin-right:16px;min-width:64px;width:64px}.main-card .aqi-btn-content .info{margin-right:auto;max-width:calc(100% - 80px)}.main-card .aqi-btn-content .info .title{color:inherit;font-family:inherit;font-size:var(--ha-card-header-font-size,24px);line-height:1.2;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.main-card .aqi-btn-content .info .aqi-state{color:var(--secondary-text-color);font-size:13px;line-height:1;margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.main-card .aqi-btn-content .info .aqi-state .short-label:before{content:"("}.main-card .aqi-btn-content .info .aqi-state .short-label:after{content:"):"}.main-card .aqi-btn-content .info .aqi-state b{color:var(--primary-text-color);font-size:18px;font-weight:500}.main-card .readings{align-items:stretch;display:flex;flex-direction:row;justify-content:space-around;margin:16px -10px}.main-card .readings .sensor-btn{background:transparent;border:none;cursor:pointer;display:block;outline:none;padding:0;text-align:center;width:78px}.main-card .readings .sensor-btn .label{color:var(--secondary-text-color);font-size:13px;font-weight:400;height:20px;line-height:20px;margin-bottom:6px;max-width:100%;overflow:hidden;padding:0 2px;text-overflow:ellipsis;white-space:nowrap}.main-card .readings .sensor-btn .icon img{height:40px;width:40px}.main-card .readings .sensor-btn .value{font-size:13px;height:20px;line-height:20px;margin-top:6px;white-space:nowrap}.main-card .recommendation{padding-top:1px}.main-card .recommendation .title{color:var(--primary-text-color);font-size:16px;font-weight:400;margin:14px 0 4px}.main-card .recommendation .paragraph{color:var(--secondary-text-color)}.main-card.card-sm .aqi-btn-content .info .title{font-size:var(--ha-card-header-font-size,22px)}.main-card.card-sm .aqi-btn-content .info .aqi-state{margin-top:5px}.main-card.card-sm .aqi-btn-content .info .aqi-state .short-label:before{content:""}.main-card.card-sm .aqi-btn-content .info .aqi-state .short-label:after{content:":"}.main-card.card-sm .aqi-btn-content .info .aqi-state b{font-size:16px}.main-card.card-sm .readings .sensor-btn .label{font-size:12px}.main-card.card-sm .readings .sensor-btn .icon img{height:36px;width:36px}.main-card.card-sm .readings .sensor-btn .value{height:40px;margin-top:8px}.main-card.card-sm .readings .sensor-btn .value>span{display:block;text-align:center}.main-card.card-sm .readings .sensor-btn .value span:first-child{font-size:16px}.main-card.card-sm .readings .sensor-btn .value span:last-child{color:var(--secondary-text-color);font-size:12px;line-height:16px}.main-card.card-sm .recommendation .title{font-size:14px}.main-card.card-sm .recommendation .paragraph{font-size:13px;line-height:17px}.loading-card{padding:20px 0;text-align:center}.error-card{display:flex;flex-direction:column;justify-content:center}.error-card .title{font-size:26px;padding:14px 0 28px;text-align:left}.error-card .icon{text-align:center}.error-card .icon img{height:100px;width:100px}.error-card .message{font-size:16px;padding:18px 10px 6px;text-align:center}`;

class AirQualityCard extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Card size (changes after window resize)
         * @private
         */
        this.size = CardSize.MD;
        /**
         * Store sensor state
         * @private
         */
        this._states = new Map();
    }
    static get properties() {
        return {
            hass: {},
            config: { attribute: false },
            size: { state: true, type: String },
        };
    }
    static async getConfigElement() {
        await import('./air-quality-config-CjwumhYF.js');
        return document.createElement('air-quality-config');
    }
    static getStubConfig() {
        return {
            aqi_type: 'daily',
            enable_recommendation: true,
            display_first_recommendation: false,
        };
    }
    setConfig(config) {
        if (!config) {
            throw new Error(t('error.invalid_configuration'));
        }
        if (config.test_gui) {
            getLovelace().setEditMode(true);
        }
        this.config = Object.assign({ aqi_type: 'daily', enable_recommendation: true, display_first_recommendation: false }, config);
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
            }
            catch (e) {
                this._errorMessage = e.message;
                return true;
            }
        }
        let shouldUpdate = false;
        if (changedProps.has('hass')) {
            for (const sensorName of this._entitiesIds.keys()) {
                const entityId = this._entitiesIds.get(sensorName);
                const stateNew = (_a = this.hass.states[entityId]) === null || _a === void 0 ? void 0 : _a.state;
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
    connectedCallback() {
        super.connectedCallback();
        this._handleWindowResize();
        this._resizeCallback = this._handleWindowResize.bind(this);
        window.addEventListener('resize', this._resizeCallback);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        if (this._resizeCallback) {
            window.removeEventListener('resize', this._resizeCallback);
        }
    }
    render() {
        if (this._errorMessage) {
            return html `
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
            return html `
        <ha-card class="${`loading-card card-${this.size}`}">
          <ha-circular-progress active></ha-circular-progress>
        </ha-card>
      `;
        }
        return html `
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
        return html `
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
    _renderEntitiesBlock() {
        var _a, _b, _c, _d, _e, _f;
        return html `
      <div class="readings">
        <button type="button" class="sensor-btn" @click="${() => this._displayDetailEntityInfo('pm_2_5')}">
          <div class="label">PM<sub>2.5</sub></div>
          <div class="icon">
            <img src="/air-quality/pm-2-5.svg" alt="PM2.5" />
          </div>
          <div class="value">
            <span>${(_a = this._getState('pm_2_5')) !== null && _a !== void 0 ? _a : ''}</span>
            <span>µg/m³</span>
          </div>
        </button>
        <button type="button" class="sensor-btn" @click="${() => this._displayDetailEntityInfo('pm_10')}">
          <div class="label">PM<sub>10</sub></div>
          <div class="icon">
            <img src="/air-quality/pm-10.svg" alt="PM10" />
          </div>
          <div class="value">
            <span>${(_b = this._getState('pm_10')) !== null && _b !== void 0 ? _b : ''}</span>
            <span>µg/m³</span>
          </div>
        </button>
        <button type="button" class="sensor-btn" @click="${() => this._displayDetailEntityInfo('temperature')}">
          <div class="label">Temperature</div>
          <div class="icon">
            <img src="/air-quality/temperature.svg" alt="Temperature" />
          </div>
          <div class="value">
            <span>${(_c = this._getState('temperature')) !== null && _c !== void 0 ? _c : ''}</span>
            <span>°C</span>
          </div>
        </button>
        <button type="button" class="sensor-btn" @click="${() => this._displayDetailEntityInfo('humidity')}">
          <div class="label">Humidity</div>
          <div class="icon">
            <img src="/air-quality/humidity.svg" alt="Humidity" />
          </div>
          <div class="value">
            <span>${(_d = this._getState('humidity')) !== null && _d !== void 0 ? _d : ''}</span>
            <span>%</span>
          </div>
        </button>
        <button type="button" class="sensor-btn" @click="${() => this._displayDetailEntityInfo('pressure')}">
          <div class="label">Pressure</div>
          <div class="icon">
            <img src="/air-quality/pressure.svg" alt="Pressure" />
          </div>
          <div class="value">
            <span>${(_f = (_e = this._getState('pressure')) === null || _e === void 0 ? void 0 : _e.toFixed(0)) !== null && _f !== void 0 ? _f : ''}</span>
            <span>mmHg</span>
          </div>
        </button>
      </div>
    `;
    }
    _renderRecommendationBlock(aqi) {
        var _a, _b;
        if (!((_a = this.config) === null || _a === void 0 ? void 0 : _a.enable_recommendation)) {
            return;
        }
        const displayFrom = ((_b = this.config) === null || _b === void 0 ? void 0 : _b.display_first_recommendation) ? 0 : 1;
        const aqiLevel = aqiToDangerLevel(aqi);
        if (aqiLevel <= displayFrom) {
            return;
        }
        return html `
      <div class="recommendation">
        <div class="title">${t('health_effects')}</div>
        <div class="paragraph">${t(`aqi_levels.${aqiLevel}.effects`)}</div>
        <div class="title">${t('recommendation')}</div>
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
            return undefined;
        }
        if (name === 'aqi') {
            return ((_a = this.config) === null || _a === void 0 ? void 0 : _a.aqi_type) === 'daily' ? this._entitiesIds.get('aqi') : this._entitiesIds.get('aqi_instant');
        }
        else {
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
        if (name === 'aqi' && ((_a = this.config) === null || _a === void 0 ? void 0 : _a.aqi_type) === 'hourly') {
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
    _displayDetailEntityInfo(sensor) {
        const entityId = this._getEntityId(sensor);
        if (!entityId) {
            return;
        }
        fireEvent(this, 'hass-more-info', { entityId });
    }
}
AirQualityCard.styles = styles;
window.customElements.define('air-quality-card', AirQualityCard);
// Puts card into the UI card picker dialog
window.customCards = window.customCards || [];
window.customCards.push({
    type: 'air-quality-card',
    name: t('card_name'),
    description: 'Displays the readings of the weather station sensors. Provided by Air Quality integration.',
    // supported: supportsButtonPressTileFeature, // Optional
    preview: true,
    configurable: true, // Optional - defaults to false
});

export { AirQualityCard as A, LitElement as L, css as c, fireEvent as f, html as h, t };
