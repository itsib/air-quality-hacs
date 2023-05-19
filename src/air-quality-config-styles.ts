export const styles = css => {
  return css`
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
  `;
};
