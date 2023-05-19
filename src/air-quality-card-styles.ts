export const styles = css => {
  return css`
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
  `;
};
