import { RoleKey } from './types';
import { transliterate } from './transliterate';
import { BRIDE_NAME, GROOM_NAME } from './data';

export interface Guest {
  id: string;
  name: string;
  role: RoleKey;
  // Personal nickname + blurb, shown instead of the shared ROLES[role]
  // text when present. Accent/icon/isSpecial still come from the role.
  title?: string;
  blurb?: string;
}

// Personal invite links: https://<домен>/?guest=<id> fills in both name and
// role at once (see guestFromUrl.ts). Ids are transliterated from the
// Cyrillic name; when two guests share a first name, a short suffix
// disambiguates them (see comments below).
export const GUESTS: Guest[] = [
  {
    id: transliterate('Андрей'),
    name: 'Андрей',
    role: 'groom-father',
    title: 'По пейсярику',
    blurb: 'На нашей свадьбе у тебя есть полное право предлагать по пейсярику. Главное, чтобы счёт не пошёл на косарики. Веселись!',
  },
  {
    id: transliterate('Сусанна'),
    name: 'Сусанна',
    role: 'groom-mother',
    title: 'В смы-ы-ысле?',
    blurb: 'Ну что сказать-то... Блын... Как говорится "Цееелебрейт гуд таймс КАМОН!". Очень ждём тебя на нашей свадьбе, зажигай :)',
  },
  {
    id: `${transliterate('Анастасия')}-guest`,
    name: 'Анастасия',
    role: 'guest',
    title: 'Следопыт',
    blurb: 'Ты много помогала нам в поисках информации, поэтому мы решили, что на нашей свадьбе тебе тоже придётся искать — где бы присесть и куда опять убежала Заринка.',
  },
  {
    id: transliterate('Диана'),
    name: 'Диана',
    role: 'photographer',
    title: 'Фотографиня',
    blurb: 'Ну это, кароче... Птичка-то вылетит? Или как там? Разрешаем фоткать всё, что угодно. Компромата наберёшь — умотаться. Веселись!',
  },
  {
    id: transliterate('Милена'),
    name: 'Милена',
    role: 'guest',
    title: 'Водохлёб',
    blurb: 'Ты так упорно просила Диму придумать, как тебе пить ночью воду, что на нашей свадьбе мы выдаём тебе безлимитную подписку на ночное питьё. Развлекайся :)',
  },
  {
    id: transliterate('Дмитрий'),
    name: 'Дмитрий',
    role: 'speaker',
    title: 'Докладун',
    blurb: 'У тебя важнейшая роль — ты доведёшь нашу семью до кондиций семьи. Так что успехов тебе — не волнуйся, постарайся не заплакать и много перед речью не пить. Всего-то — человек 250. Ерунда. Ты таких на завтрак ешь :)',
  },
  {
    id: transliterate('Татьяна'),
    name: 'Татьяна',
    role: 'bride-mother',
    title: 'ТанюсяМамуся',
    blurb: 'Жизнь — она как турецкий сериал. Только в турецких сериалах ничего не понятно. Вот Лера и решила выйти замуж и разобраться. Поздравляем — скоро ты станешь тёщей!',
  },
  {
    id: transliterate('Галина'),
    name: 'Галина',
    role: 'guest',
    title: 'Бабуль-буль-буль',
    blurb: 'Ты пошла на большие жертвы, чтобы поехать на нашу свадьбу, и мы очень это ценим. Награждаем тебя почётным званием героини!',
  },
  {
    id: transliterate('Ольга'),
    name: 'Ольга',
    role: 'guest',
    title: 'Сладкоежка',
    blurb: 'Мы прекрасно помним, как ты угощала нас конфетами на Войновке. Мы прекрасно знаем, что на свадьбе планируется торт. Выводы делай сама...',
  },
  {
    id: `${transliterate('Кирилл')}-guest`,
    name: 'Кирилл',
    role: 'guest',
    title: 'Собутыльник',
    blurb: 'Ну эт, короч... Ты там давай не налегай на винцо, а то ведь мы тебя знаем — без нас всё выдуешь. Мы тож хотим :)',
  },
  {
    id: `${transliterate('Елизавета')}-bridesmaid`,
    name: 'Елизавета',
    role: 'bridesmaid',
    title: 'Суетолог',
    blurb: 'Мы тебя ещё не пригласили, а ты уже спланировала дорогу до ЗАГСа. Ну реально суетолог. Вроде заслуженная награда.',
  },
  {
    id: transliterate('Жулдузай'),
    name: 'Жулдузай',
    role: 'bridesmaid',
    title: 'НеЖулдузбек',
    blurb: 'Мы торжественно клянёмся, что будем поправлять тех, кто будет неправильно вспоминать твоё имя. Разрешаем пить вино и запивать горе, если это произойдёт...',
  },
  {
    id: transliterate('Надежда'),
    name: 'Надежда',
    role: 'bridesmaid',
    title: 'Шалтай-Болтай',
    blurb: 'Шалтай — потому что стоматологи лечат шалтающиеся зубы. Болтай — потому что бариста взбалтывает напитки и болтает с клиентами. Короче заслужила.',
  },
  {
    id: transliterate('Алёна'),
    name: 'Алёна',
    role: 'bridesmaid',
    title: 'Шоколадка',
    blurb: 'Чем славится шоколад? Тем, что подходит к вину (и говорит). Побуждаем тебя тоже подходить к вину и говорить — с кем бы то ни было. Веселись :)',
  },
  {
    id: `${transliterate('Анастасия')}-bridesmaid`,
    name: 'Анастасия',
    role: 'bridesmaid',
    title: 'Спец по крапиве',
    blurb: 'Если в нашем домике появятся злостные ростки крапивы — мы точно знаем, к кому обратиться. Даже нам немножечко страшно — крапива наверное ваще в ужасе.',
  },
  {
    id: transliterate('Алексей'),
    name: 'Алексей',
    role: 'groomsman',
    title: 'Бубалех',
    blurb: 'Ну шо ты, мужик, не плачь там главное, понимаем что друга провожаешь в последний раз холостого куда-то. Можешь пить винишко и запивать печаль. Мы тож будем :)',
  },
  {
    id: `${transliterate('Елизавета')}-family`,
    name: 'Елизавета',
    role: 'family-friend',
    title: 'Жинка бубалеха',
    blurb: 'Лизка, ты вытащила бродягу с улиц и подарила ему дом и уют. До тебя он не ведал счастья. Го с нами на свадьбе пить за Лёху.',
  },
  {
    id: transliterate('Даниал'),
    name: 'Даниал',
    role: 'style-icon',
    title: 'Икона стиля',
    blurb: 'Даже не спрашивай, почему. Все знают, что ты красавчик и просто мега привлекательный казах. Зажигай брат, только вперёд, ни шагу назад, много не пей, мало тоже не пей, связь. Ой бай...',
  },
  {
    id: transliterate('Степан'),
    name: 'Степан',
    role: 'hype-creator',
    title: 'Создатель хайпа',
    blurb: 'СИКС СЕЕЕВЕН. Помнишь? Не вздумай орать на каждом углу. А то это... Хайп кончится. Разрешаем заводить тусовку и расшевеливать всё, что сидит. Сияй, брат :)',
  },
  {
    id: transliterate('Станислав'),
    name: 'Станислав',
    role: 'host',
    title: 'ЗаВедущий',
    blurb: 'Я рад, что мы с тобой знакомы. Проведёшь свадьбу? Можешь полакомиться, пока ты не в тюрьме, бро.',
  },
  {
    id: `${transliterate('Кирилл')}-nazar`,
    name: 'Кирилл',
    role: 'friend-of-nazar',
    title: 'Кореш Назарбая',
    blurb: 'Кирюх, пригляди там за Назарчиком, а то он своей харизмой и братской любовью украсит нашу свадьбу. Ну нельзя ведь так! Мы тебе доверяем... Спец-задание: налепи на него прищепок.',
  },
  {
    id: transliterate('Назар'),
    name: 'Назар',
    role: 'friend-of-kirill',
    title: 'Кореш Кирюхи',
    blurb: 'Назарчик, не дай Кирюхе за собой приглядывать — сей любовь и будь харизматичен. А то знаем мы тебя... Не устоишь. Спец-задание: налепи на Кирюху прищепок, да побольше!',
  },
  {
    id: transliterate('Зарина'),
    name: 'Зарина',
    role: 'financial-director',
    title: 'Финансовый директор',
    blurb: 'Зарина, мы знаем что ты не умеешь читать бегло, но пусть мама скажет тебе, что твоя задача — подходить к гостям, и спрашивать, всё ли у них хорошо. В конце дня отдашь нам отчёт и посчитаешь, сколько гости нам должны за съеденное. Дерзай!',
  },
  {
    id: transliterate('Айрат'),
    name: 'Айрат',
    role: 'sports-star',
    title: 'Звезда спорта',
    blurb: 'Айрат, у нас на свадьбе коней не будет, так что можешь расслабиться и спокойно отдохнуть. Если отец предложит по пейсярику — твоя задача как можно дольше не дать ему выпить. Отвлекай его всяческими методами. Поржём :)',
  },
];

export interface Family {
  id: string;
  memberIds: string[];
  // An extra highlighted card shown in the popup alongside real guests —
  // the groom/bride themselves aren't guest entries, so this is how their
  // side of the family gets represented without a fake Guest record.
  special?: { label: string; name: string };
}

// Small guest groupings — used to power the "who's my family here" popup.
// Order of memberIds controls display order in the popup.
export const FAMILIES: Family[] = [
  { id: 'family-aleksey-elizaveta', memberIds: [`${transliterate('Алексей')}`, `${transliterate('Елизавета')}-family`] },
  {
    id: 'family-groom-side',
    memberIds: [
      transliterate('Диана'),
      transliterate('Милена'),
      transliterate('Дмитрий'),
      `${transliterate('Анастасия')}-guest`,
      transliterate('Айрат'),
      transliterate('Зарина'),
      transliterate('Андрей'),
      transliterate('Сусанна'),
    ],
    special: { label: 'Жених', name: GROOM_NAME },
  },
  {
    id: 'family-bride-side',
    memberIds: [
      transliterate('Галина'),
      transliterate('Татьяна'),
      transliterate('Ольга'),
      `${transliterate('Кирилл')}-guest`,
    ],
    special: { label: 'Невеста', name: BRIDE_NAME },
  },
];

export function findGuestById(id: string): Guest | undefined {
  return GUESTS.find((g) => g.id === id);
}

export function findFamilyForGuest(guestId: string): Family | undefined {
  return FAMILIES.find((f) => f.memberIds.includes(guestId));
}

export function familyMembers(family: Family): Guest[] {
  return family.memberIds
    .map((id) => findGuestById(id))
    .filter((g): g is Guest => Boolean(g));
}

// Guests are numbered by their position in GUESTS (001–024), shown as the
// "Special Pass" ticket number. Links without a resolved guest fall back to
// a neutral placeholder rather than always showing 001.
export function guestTicketNumber(guest: Guest | null | undefined): string {
  if (!guest) return '—';
  const index = GUESTS.findIndex((g) => g.id === guest.id);
  return String(index + 1).padStart(3, '0');
}
