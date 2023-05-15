export function getAqiLevel(aqi: number): number {
  if (aqi > 500) {
    return 7;
  }
  if (aqi > 300) {
    return 6;
  }
  if (aqi > 200) {
    return 5;
  }
  if (aqi > 150) {
    return 4;
  }
  if (aqi > 100) {
    return 3;
  }
  if (aqi > 50) {
    return 2;
  }
  return 1;
}

export function getAqiLevelIconUrl(level: number): string {
  switch (level) {
    case 1:
      return '/air-quality/level-good.svg';
    case 2:
      return '/air-quality/level-moderate.svg';
    case 3:
      return '/air-quality/level-increased.svg';
    case 4:
      return '/air-quality/level-high.svg';
    case 5:
      return '/air-quality/level-very-high.svg';
    case 6:
      return '/air-quality/level-very-high.svg';
    default:
      return '/air-quality/level-very-high.svg';
  }
}
