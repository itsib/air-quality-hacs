declare global {
  interface HASSDomEvents {
    'config-changed': {
      config: any;
    };
    'hass-more-info': {
      entityId: string | undefined;
    };
  }
}

export interface HomeAssistant {
  entities: HassEntities;
  states: HassEntities;
}

export interface LovelaceCardConfig {
  index?: number;
  view_index?: number;
  type: string;
  [key: string]: any;
}

export interface LovelaceConfig {
  title?: string;
  views: LovelaceViewConfig[];
  background?: string;
}

export interface LovelaceViewConfig {
  index?: number;
  title?: string;
  cards?: LovelaceCardConfig[];
  path?: string;
  icon?: string;
  theme?: string;
  panel?: boolean;
  background?: string;
}

export interface LovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  isPanel?: boolean;
  editMode?: boolean;
  getCardSize(): number | Promise<number>;
  setConfig(config: LovelaceCardConfig): void;
}

export interface LovelaceCardEditor extends HTMLElement {
  hass?: HomeAssistant;
  lovelace?: LovelaceConfig;
  setConfig(config: LovelaceCardConfig): void;
}

export interface HassEntities {
  [entityId: string]: HassEntity;
}

export interface HassEntity {
  entity_id: string;
  name?: string;
  platform?: string;
  area_id?: string;
  device_id?: string;
  display_precision?: number;
  entity_category?: string;
  hidden?: boolean;
  translation_key?: string;
  state: string;
}

export type HaFormSchema = HaFormGridSchema | HaFormBooleanSchema | HaFormSelectSchema | HaFormSelectorSelect | HaFormConstantSchema | HaFormSelectorSwitch;

export interface HaFormBaseSchema<T> {
  name: string;
  // This value is applied if no data is submitted for this field
  default?: T;
  required?: boolean;
  disabled?: boolean;
  description?: {
    suffix?: string;
    // This value will be set initially when form is loaded
    suggested_value?: T;
  };
  context?: Record<string, string>;
}

export interface HaFormGridSchema extends Omit<HaFormBaseSchema<HaFormBaseSchema<any>>, 'name'> {
  type: 'grid';
  name?: string;
  column_min_width?: string;
  schema: readonly HaFormSchema[];
}

export interface HaFormSelectSchema extends HaFormBaseSchema<string> {
  type: 'select';
  options: ReadonlyArray<readonly [string, string]>;
}

export interface HaFormBooleanSchema extends HaFormBaseSchema<boolean> {
  type: 'boolean';
}

export interface HaFormSelectorSelect extends HaFormBaseSchema<string> {
  type?: never;
  selector: {
    select: {
      multiple?: boolean;
      custom_value?: boolean;
      mode?: 'list' | 'dropdown';
      options: {
        value: string;
        label: string;
        disabled?: boolean;
      }[];
      translation_key?: string;
    };
  };
}

export interface HaFormSelectorSwitch extends HaFormBaseSchema<boolean> {
  type?: never;
  selector: {
    boolean: {} | null;
  };
}

export interface HaFormConstantSchema extends HaFormBaseSchema<string> {
  type: 'constant';
  value?: string;
}

export interface ValueChangeEvent<T extends LovelaceCardConfig> extends Event {
  detail: {
    value: T;
  };
}

export interface HASSDomEvent<T> extends Event {
  detail: T;
}

export type ValidHassDomEvent = keyof HASSDomEvents;
