export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy';

export const STATUS_COLOR: Record<AvatarStatus, string> = {
  online:  '#22c55e',
  offline: '#a1a1aa',
  away:    '#fbbf24',
  busy:    '#ef4444',
};

export const STATUS_LABEL: Record<AvatarStatus, string> = {
  online:  'Online',
  offline: 'Offline',
  away:    'Ausente',
  busy:    'Ocupado',
};
