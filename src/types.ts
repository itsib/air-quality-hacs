import { AirQualityCard } from './air-quality-card';
import { LovelaceCardConfig } from 'custom-card-helpers';

declare global {
  interface HTMLElementTagNameMap {
    'air-quality-card': AirQualityCard;
  }
}

export enum DangerLevel {
  FIRST = 1, // 0-50 Excellent
  SECOND, // 51-100 Good
  THIRD, // 101–150
  FOURTH, // 151-200
  FIFTH, // 201-300
  SIXTH, // 301-500
  SEVENTH, // > 500
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

export type SensorName = 'aqi' | 'aqi_instant' | 'pm_2_5' | 'pm_10' | 'humidity' | 'pressure' | 'temperature';
