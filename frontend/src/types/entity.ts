export interface EntityState {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
  last_updated: string;
  context: {
    id: string;
    parent_id: string | null;
    user_id: string | null;
  };
}

export interface EntityDomain {
  domain: string;
  count: number;
  icon: string;
}

export type EntityFilter = {
  search: string;
  domain: string;
  state: string;
  area: string;
};

export const DOMAIN_ICONS: Record<string, string> = {
  light: '💡',
  switch: '🔌',
  sensor: '📊',
  binary_sensor: '🔘',
  automation: '⚙️',
  script: '📜',
  scene: '🎬',
  climate: '🌡️',
  cover: '🪟',
  fan: '🌀',
  media_player: '📺',
  camera: '📷',
  lock: '🔒',
  alarm_control_panel: '🚨',
  vacuum: '🧹',
  weather: '🌤️',
  person: '👤',
  device_tracker: '📍',
  input_boolean: '☑️',
  input_number: '🔢',
  input_select: '📝',
  input_text: '✏️',
  input_datetime: '📅',
  timer: '⏱️',
  counter: '🔢',
  group: '📁',
  zone: '🗺️',
  sun: '☀️',
  update: '⬆️',
  button: '🔲',
  number: '#️⃣',
  select: '📋',
  text: '📝',
  default: '❓',
};

export function getDomainIcon(entityId: string): string {
  const domain = entityId.split('.')[0];
  return DOMAIN_ICONS[domain] || DOMAIN_ICONS.default;
}

export function getDomainFromEntityId(entityId: string): string {
  return entityId.split('.')[0];
}

export function getStateBadgeClass(state: string): string {
  const lowerState = state.toLowerCase();
  if (lowerState === 'on' || lowerState === 'home' || lowerState === 'open' || lowerState === 'playing') {
    return 'ha-badge-on';
  }
  if (lowerState === 'off' || lowerState === 'away' || lowerState === 'closed' || lowerState === 'idle') {
    return 'ha-badge-off';
  }
  if (lowerState === 'unavailable') {
    return 'ha-badge-unavailable';
  }
  if (lowerState === 'unknown') {
    return 'ha-badge-unknown';
  }
  return 'ha-badge-on'; // Default for numeric/other states
}
