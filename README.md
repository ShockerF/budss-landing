# Budss — Landing Page

Тестовое задание: вёрстка двух блоков по макету Figma.

## Что сделано

- Hero-секция с заголовком, описанием и кнопкой
- About-секция с описанием продукта и четырьмя карточками фич
- Модальное окно по клику на "Contact sales"
- Валидация формы с маской телефона +7
- Адаптивная вёрстка под все устройства
- Мобильное меню с бургером

## Стек

- HTML5 (семантическая разметка)
- CSS3 (Grid, Flexbox, CSS-переменные, медиазапросы)
- JavaScript (без фреймворков)
- SVG-иллюстрации и иконки

## Структура

```
budss/
├── index.html
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── main.js
    └── img/
        ├── hero-person.svg
        ├── deco-b.svg
        ├── logo-icon.svg
        ├── icon-contactless.svg
        ├── icon-buying-power.svg
        ├── icon-analytics.svg
        └── icon-fraud.svg
```

## Методология

Именование классов по БЭМ:
- `.header` — блок
- `.header__logo` — элемент
- `.btn--purple` — модификатор

## Адаптивность

| Разрешение | Поведение |
|---|---|
| > 1100px | Desktop: две колонки в hero |
| 900–1100px | Планшет: уменьшенные размеры |
| < 900px | Hero в одну колонку, about в две |
| < 640px | Мобильный: бургер-меню, всё в одну колонку |

## Запуск

Открой `index.html` в браузере — никаких зависимостей нет.

## GitHub Pages

После загрузки на GitHub:
Settings → Pages → Branch: main → / (root) → Save

Сайт будет доступен по адресу `https://ИМЯ.github.io/budss-landing/`
