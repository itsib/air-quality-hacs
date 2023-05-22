import { LovelaceCardConfig } from './ha-ui';

export enum DangerLevel {
  FIRST = 1, // 0-50 Excellent
  SECOND, // 51-100 Good
  THIRD, // 101–150
  FOURTH, // 151-200
  FIFTH, // 201-300
  SIXTH, // 301-500
  SEVENTH, // > 500
}

export enum CardSize {
  SM = 'sm',
  MD = 'md',
}

export type SensorName = 'aqi' | 'aqi_instant' | 'pm_2_5' | 'pm_10' | 'humidity' | 'pressure' | 'temperature';

export interface AirQualityCardConfig extends LovelaceCardConfig {
  type: string;
  aqi_type?: 'hourly' | 'daily';
  enable_recommendation?: boolean;
  display_first_recommendation?: boolean;
}
