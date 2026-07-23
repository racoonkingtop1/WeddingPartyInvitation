import { ScheduleItem, RoleDef, RoleKey } from './types';

export const BRIDE_NAME = 'Валерия';
export const GROOM_NAME = 'Павел';
export const EVENT_DATE_LABEL = '20 августа 2026';
export const EVENT_DATE_SHORT = '20.08.2026';
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
// Любой blurb может содержать токен {name} — RoleBlock подставит туда имя
// гостя из ?name= (или «дорогой гость», если параметра нет в ссылке).
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
  'groom-father': {
    key: 'groom-father',
    isSpecial: true,
    title: 'Отец жениха',
    accent: 'navy',
    icon: 'Home',
    blurb: 'Ты для Павла — пример и опора с самого детства. Спасибо, что сегодня рядом с нами, в кругу самых близких.',
  },
  'groom-mother': {
    key: 'groom-mother',
    isSpecial: true,
    title: 'Мама жениха',
    accent: 'gold',
    icon: 'Heart',
    blurb: 'Ты подарила Павлу столько тепла, что хватило на всю жизнь. Спасибо, что сегодня ты рядом — в самом важном ряду.',
  },
  'bride-mother': {
    key: 'bride-mother',
    isSpecial: true,
    title: 'Мама невесты',
    accent: 'gold',
    icon: 'Flower2',
    blurb: 'Ты вырастила Валерию такой, какая она есть — сильной и любящей. Для нас огромная честь видеть тебя сегодня рядом.',
  },
  'family-friend': {
    key: 'family-friend',
    isSpecial: true,
    title: 'Подруга семьи',
    accent: 'sky',
    icon: 'Users',
    blurb: 'Ты давно стала частью нашей семьи, а не просто гостьей. Спасибо, что сегодня {name} снова рядом с нами.',
  },
  'style-icon': {
    key: 'style-icon',
    isSpecial: true,
    title: 'Икона стиля',
    accent: 'gold',
    icon: 'Wand2',
    blurb: 'Официально объявляем: сегодня самый стильный образ вечера — за {name}. Не подведи!',
  },
  'hype-creator': {
    key: 'hype-creator',
    isSpecial: true,
    title: 'Создатель хайпа',
    accent: 'navy',
    icon: 'PartyPopper',
    blurb: 'Без {name} на этом вечере было бы значительно скучнее — особая миссия: зажечь всех до самого танцпола.',
  },
  'friend-of-nazar': {
    key: 'friend-of-nazar',
    isSpecial: true,
    title: 'Кореш Назара',
    accent: 'sky',
    icon: 'Handshake',
    blurb: 'Куда Назар — туда и {name}. Спасибо, что снова рядом со своим лучшим корешем — и с нами заодно.',
  },
  'friend-of-kirill': {
    key: 'friend-of-kirill',
    isSpecial: true,
    title: 'Кореш Кирилла',
    accent: 'sky',
    icon: 'Handshake',
    blurb: 'Куда Кирилл — туда и {name}. Спасибо, что снова рядом со своим лучшим корешем — и с нами заодно.',
  },
  'financial-director': {
    key: 'financial-director',
    isSpecial: true,
    title: 'Финансовый директор',
    accent: 'ink',
    icon: 'Briefcase',
    blurb: 'Официально — {name}, финансовый директор сегодняшнего вечера. Неофициально — просто один из самых важных людей в нашей жизни.',
  },
  'sports-star': {
    key: 'sports-star',
    isSpecial: true,
    title: 'Звезда спорта',
    accent: 'gold',
    icon: 'Trophy',
    blurb: 'На спортивной арене {name} нет равных — сегодня выходишь в новой роли: звезда танцпола.',
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
  'groom-father',
  'groom-mother',
  'bride-mother',
  'family-friend',
  'style-icon',
  'hype-creator',
  'friend-of-nazar',
  'friend-of-kirill',
  'financial-director',
  'sports-star',
];
