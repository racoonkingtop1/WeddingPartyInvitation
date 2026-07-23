# Wedding Party Invitation

Отдельный сайт-приглашение на свадебные посиделки (Валерия & Павел, 20 августа
2026). Vite + React + TypeScript + Tailwind CSS v4. Дизайн-система описана в
[`DESIGN.md`](./DESIGN.md).

## Персональные ссылки по гостю

Самый простой способ — параметр `guest` со slug'ом гостя из
[`src/guests.ts`](./src/guests.ts) (`GUESTS`). Он сразу подставляет и имя, и
роль:

```
https://<домен>/?guest=andrey     — Андрей, Отец жениха
https://<домен>/?guest=dmitriy    — Дмитрий, Докладчик
```

Полный список гостей и их slug'и — в `GUESTS` (`src/guests.ts`). Slug —
это транслитерация имени (см. [`src/transliterate.ts`](./src/transliterate.ts)),
с добавленным суффиксом-ролью там, где несколько гостей носят одно и то же
имя (например `anastasiya-guest` и `anastasiya-bridesmaid`,
`kirill-guest` и `kirill-nazar`, `elizaveta-bridesmaid` и
`elizaveta-family`).

Если гость входит в одну из групп в `FAMILIES` (`src/guests.ts`), в шапке
под билетом появляется кнопка «Кто моя семья?» — открывает попап со списком
членов семьи и их ролями (`src/components/FamilyPopup.tsx`).

## Роли и имя по URL (ручной режим)

Тот же результат можно собрать вручную двумя параметрами — удобно для ссылок
без привязки к конкретному гостю из списка:

```
https://<домен>/?role=guest         — Гость (по умолчанию)
https://<домен>/?role=dj            — Диджей
https://<домен>/?role=host          — Ведущий
https://<домен>/?role=photographer  — Фотограф
https://<домен>/?role=coordinator   — Распорядитель
https://<домен>/?role=speaker       — Докладчик
https://<домен>/?role=bridesmaid    — Подруга невесты
https://<домен>/?role=groomsman     — Друг жениха
https://<домен>/?role=groom-father  — Отец жениха
https://<домен>/?role=groom-mother  — Мама жениха
https://<домен>/?role=bride-mother  — Мама невесты
https://<домен>/?role=family-friend — Подруга семьи
https://<домен>/?role=style-icon    — Икона стиля
https://<домен>/?role=hype-creator  — Создатель хайпа
https://<домен>/?role=friend-of-nazar     — Кореш Назара
https://<домен>/?role=friend-of-kirill    — Кореш Кирилла
https://<домен>/?role=financial-director  — Финансовый директор
https://<домен>/?role=sports-star   — Звезда спорта
```

Список ролей и их описания — в [`src/data.ts`](./src/data.ts) (`ROLES`).
Чтобы добавить новую роль: добавить ключ в `RoleKey` (`src/types.ts`), запись
в `ROLES`/`ROLE_ORDER` и, при необходимости, алиас в
[`src/roleFromUrl.ts`](./src/roleFromUrl.ts).

Параметр `name` подставляет имя гостя в билет-шапку и в персональное
приветствие блока «Твоя роль» (см. [`src/nameFromUrl.ts`](./src/nameFromUrl.ts)):

```
https://<домен>/?role=dj&name=Иван
```

Любой `blurb` в `ROLES` (`src/data.ts`) может содержать токен `{name}` —
он будет автоматически заменён на имя из ссылки (или на «дорогой гость»,
если параметра нет). `?guest=` подставляет имя автоматически, так что
токен `{name}` работает и там.

## Что нужно донастроить вручную

- **QR-код** (`src/components/QRBlock.tsx`) — сейчас плейсхолдер, замените на
  `<img>` с реальным QR-кодом, когда он будет готов.
- **Ссылка на чат мероприятия** — константа `EVENT_CHAT_URL` в
  [`src/data.ts`](./src/data.ts).
- **Расписание** — массив `SCHEDULE` в `src/data.ts`, можно свободно
  добавлять/менять/удалять пункты.

## Разработка

```bash
npm install
npm run dev      # http://localhost:3001
npm run build
npm run lint      # tsc --noEmit
```

Деплой — автоматический, через GitHub Actions (`.github/workflows/deploy.yml`)
на GitHub Pages при пуше в `master`.
