import { ScheduleItem, RoleDef, RoleKey } from './types';

export const BRIDE_NAME = 'Валерия';
export const GROOM_NAME = 'Павел';
export const EVENT_DATE_LABEL = '20 августа 2026';
export const EVENT_ADDRESS = 'г. Верхняя Пышма, СНТ «Ясная Поляна №94», дом 194';
export const EVENT_ADDRESS_QUERY = 'Свердловская область, Верхняя Пышма, СНТ Ясная Поляна №94, дом 194';
export const EVENT_CHAT_URL = 'https://t.me/'; // TODO: заменить на реальную ссылку на чат мероприятия

// Программа дня — можно свободно добавлять/убирать/переставлять пункты,
// компонент ScheduleBlock просто рендерит этот массив по порядку.
export const SCHEDULE: ScheduleItem[] = [
  {
    id: 'arrival',
    time: '16:00',
    title: 'Заезд гостей',
    description: 'Встречаем, рассаживаемся, знакомимся с площадкой.',
  },
  {
    id: 'speech',
    time: '17:00',
    title: 'Свадебная речь',
    description: 'Тёплые слова от молодожёнов и первые тосты.',
  },
  {
    id: 'dinner',
    time: '18:15',
    title: 'Начало ужина',
    description: 'Рассаживаемся за столы — праздничный ужин начинается.',
  },
];

// Единственный источник правды по ролям. RoleBlock читает ?role= из URL
// и берёт отсюда нужное описание; неизвестное/пустое значение = 'guest'.
export const ROLES: Record<RoleKey, RoleDef> = {
  guest: {
    key: 'guest',
    isSpecial: false,
    title: 'Гость',
    accent: 'sky',
    icon: 'Ticket',
    blurb: 'Этот билет — твой личный пропуск на наши свадебные посиделки. Просто приходи, будь собой и наслаждайся вечером вместе с нами.',
  },
  dj: {
    key: 'dj',
    isSpecial: true,
    title: 'Диджей',
    accent: 'navy',
    icon: 'Disc3',
    blurb: 'Ты держишь в руках вечер в самом прямом смысле — плейлист, настроение и танцпол на тебе. Площадка и время для саундчека будут согласованы заранее, а тайминг ключевых моментов — в программе ниже.',
  },
  host: {
    key: 'host',
    isSpecial: true,
    title: 'Ведущий',
    accent: 'gold',
    icon: 'Mic2',
    blurb: 'Ты — голос и ритм этого дня. Просим держать связь с распорядителем по таймингу и дать нам знать, если понадобится что-то дополнительно для программы.',
  },
  photographer: {
    key: 'photographer',
    isSpecial: true,
    title: 'Фотограф',
    accent: 'ink',
    icon: 'Camera',
    blurb: 'Ты ловишь моменты, которые останутся с нами навсегда. Ключевые точки программы — ниже, будем благодарны за пару кадров с каждого этапа вечера.',
  },
  coordinator: {
    key: 'coordinator',
    isSpecial: true,
    title: 'Распорядитель',
    accent: 'navy',
    icon: 'ClipboardList',
    blurb: 'На тебе — весь вечер как единое целое. Полная программа ниже, будем на связи по любым изменениям тайминга в моменте.',
  },
  speaker: {
    key: 'speaker',
    isSpecial: true,
    title: 'Докладчик',
    accent: 'gold',
    icon: 'MessageSquareText',
    blurb: 'Тебе слово в 17:00 — свадебная речь. Не переживай, все будут на твоей стороне. Спасибо, что разделишь с нами этот момент.',
  },
  bridesmaid: {
    key: 'bridesmaid',
    isSpecial: true,
    title: 'Подруга невесты',
    accent: 'gold',
    icon: 'Sparkles',
    blurb: 'Ты рядом с Валерией с самого начала подготовки — и это бесценно. Спасибо, что ты часть этого дня, а не просто гостья на нём.',
  },
  groomsman: {
    key: 'groomsman',
    isSpecial: true,
    title: 'Друг жениха',
    accent: 'navy',
    icon: 'Users',
    blurb: 'Павел рад видеть тебя рядом в этот день. Спасибо за поддержку и за то, что всегда рядом — сегодня особенно.',
  },
};

export const ROLE_ORDER: RoleKey[] = [
  'guest',
  'dj',
  'host',
  'photographer',
  'coordinator',
  'speaker',
  'bridesmaid',
  'groomsman',
];
