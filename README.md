 Simple Deadline Manager
[![CI/CD Pipeline](https://github.com/LachykV/simple-deadline-manager/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/LachykV/simple-deadline-manager/actions/workflows/ci-cd.yml)
> MVP для управління дедлайнами: додавання завдань, встановлення дедлайнів, фільтрацією за терміновістю.

## Production

Робоча версія застосунку доступна за посиланням:
https://simple-deadline-manager.vercel.app/

## Стек технологій

- Vue 3 (Composition API)
- Vite
- TailwindCSS

## Запуск проєкту

```bash
# Встановити залежності
npm install

# Запустити в режимі розробки
npm run dev

# Зібрати для продакшену
npm run build
```

## Структура проєкту

- `src/components/` — UI компоненти
- `src/composables/` — бізнес-логіка (useTasks)

## Функціонал MVP

- Додавання завдань з назвою та дедлайном
- Відображення кількості днів до дедлайну
- Виділення термінових завдань (дедлайн менше 3 днів)
- Видалення завдань
