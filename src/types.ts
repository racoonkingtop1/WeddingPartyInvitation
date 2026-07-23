export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  description: string;
}

export type RoleKey =
  | 'guest'
  | 'dj'
  | 'host'
  | 'photographer'
  | 'coordinator'
  | 'speaker'
  | 'bridesmaid'
  | 'groomsman'
  | 'groom-father'
  | 'groom-mother'
  | 'bride-mother'
  | 'family-friend'
  | 'style-icon'
  | 'hype-creator'
  | 'friend-of-nazar'
  | 'friend-of-kirill'
  | 'financial-director'
  | 'sports-star';

export type RoleAccent = 'sky' | 'gold' | 'navy' | 'ink';

export interface RoleDef {
  key: RoleKey;
  isSpecial: boolean;
  title: string;
  accent: RoleAccent;
  icon: string;
  blurb: string;
}
