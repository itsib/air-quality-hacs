import { AirQualityCard } from './air-quality-card';
import { LovelaceCardConfig } from 'custom-card-helpers';

declare global {
  interface HTMLElementTagNameMap {
    'air-quality-card': AirQualityCard;
  }
}

export interface AirQualityCardConfig extends LovelaceCardConfig {
  type: string;
  aqi_type?: 'hourly' | 'daily';
  enable_recommendation?: boolean;
  display_first_recommendation?: boolean;
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
}

export interface AirQualitySensors {
  aqi: string;
  aqi_instant: string;
  pm_2_5: string;
  pm_10: string;
  humidity: string;
  pressure: string;
  temperature: string;
}
