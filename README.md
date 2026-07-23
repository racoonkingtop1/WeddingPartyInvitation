# Wedding Party Invitation

Отдельный сайт-приглашение на свадебные посиделки (Валерия & Павел, 20 августа
2026). Vite + React + TypeScript + Tailwind CSS v4. Дизайн-система описана в
[`DESIGN.md`](./DESIGN.md).

## Роли по URL

Контент блока «Твоя роль» зависит от параметра `role` в адресной строке:

```
https://<домен>/?role=guest         — Гость (по умолчанию)
https://<домен>/?role=dj            — Диджей
https://<домен>/?role=host          — Ведущий
https://<домен>/?role=photographer  — Фотограф
https://<домен>/?role=coordinator   — Распорядитель
https://<домен>/?role=speaker       — Докладчик
https://<домен>/?role=bridesmaid    — Подруга невесты
https://<домен>/?role=groomsman     — Друг жениха
```

Список ролей и их описания — в [`src/data.ts`](./src/data.ts) (`ROLES`).
Чтобы добавить новую роль: добавить ключ в `RoleKey` (`src/types.ts`), запись
в `ROLES`/`ROLE_ORDER` и, при необходимости, алиас в
[`src/roleFromUrl.ts`](./src/roleFromUrl.ts).

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
