# React + TypeScript + Vite

## Підключення до бекенду

1. Скопіюйте `.env.example` у `.env.local` у корені проєкту.
2. Впишіть у `VITE_API_BASE_URL` адресу бекенду без `/posts`. Порт залежить від того, на якому порту запущено бекенд.
3. Перезапустіть `npm run dev`, якщо сервер розробки вже запущений. Vite використовує стандартний порт `5173` і вибере наступний вільний порт, якщо він зайнятий.

Фронтенд запитує список дописів за шляхом `/posts`. Якщо шлях у вашому бекенді відрізняється, змініть його у `src/api/posts.ts`. Бекенд має дозволяти запити з адреси фронтенду (CORS).

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
