
## ✅ Чек-лист стандартизації тестів і Page Object-ів (Playwright + TypeScript)

_Основа — AbTestPage.page.ts і abTest.spec.ts_

---

### ✅ 1. Стандартизація Page Object-ів (src/pages)

#### 📄 Загальні вимоги
| Елемент                      | Обов'язково                |
|------------------------------|----------------------------|
| **Назва файлу**              | CamelCasePage.page.ts      |
| **Клас**                     | CamelCasePage              |
| **Опис класу**               | JSDoc-коментар над класом   |
| **Типізація**                | Page, Promise<>, Locator   |
| **Методи**                   | goto(), інші публічні методи |
| **Локатори**                 | Приватні (private) поля    |
| **Конструктор**              | З параметром page: Page    |

#### 📑 Структура Page Object-а
1. Імпорти:
```typescript
import { Page, expect } from '@playwright/test';
```

2. JSDoc до класу:
```typescript
/**
 * Клас для взаємодії зі сторінкою {назва}
 */
```

3. Поля та методи:
```typescript
readonly page: Page;
private exampleLocator = 'h3';

async goto(): Promise<void> { ... }
```

---

### ✅ 2. Стандартизація тестів (tests/)

#### 📄 Загальні вимоги
| Елемент                      | Обов'язково                |
|------------------------------|----------------------------|
| **Назва файлу**              | kebab-case.spec.ts         |
| **Структура**                | test.describe → beforeEach → test |
| **Allure інтеграція**        | allure.step() для основних дій |
| **JSDoc-коментарі**          | На describe, перед тестами |
| **Імпорти**                  | import * as allure from 'allure-playwright'; |
| **Ассерти**                  | expect() з поясненнями     |
| **beforeEach**               | Ініціалізація Page Object і goto() |
| **Імена тестів**             | should ...                |

#### 📑 Структура спеки
1. Імпорти:
```typescript
import { test, expect } from '@playwright/test';
import * as allure from 'allure-playwright';
import { ExamplePage } from '../../src/pages/ExamplePage.page';
```

2. Опис describe:
```typescript
/**
 * Тестова сьют для {назва сторінки}
 */
test.describe('{назва сторінки}', () => {...})
```

3. beforeEach:
```typescript
test.beforeEach(async ({ page }) => {
    examplePage = new ExamplePage(page);
    await allure.step('Перейти на сторінку', async () => {
        await examplePage.goto();
    });
});
```

4. Тести з allure:
```typescript
test('should display correct heading', async () => {
    await allure.step('Отримати текст заголовка', async () => {
        const heading = await examplePage.getHeadingText();
        expect(heading).toContain('Expected');
    });
});
```

---

### ✅ 3. Інтеграція з Allure

| Компонент            | Рекомендація                                            |
|----------------------|---------------------------------------------------------|
| allure.step()        | Кожна дія, яку виконує користувач                      |
| allure.label()       | Додати epic, feature, severity (опціонально)           |
| allure.attachment()  | Для зняття скріншотів на фейлах (можна в Playwright хуки) |
| allure-playwright    | Має бути встановлений та доданий у config               |

---

### ✅ 4. Оформлення та стиль

| Елемент              | Рекомендація               |
|----------------------|----------------------------|
| Форматування коду    | eslint + prettier          |
| Конвенції іменування | CamelCase (класи, PO), kebab-case (папки тестів) |
| Оформлення тестів    | Given-When-Then або AAA    |

---

### ✅ 5. Перевірка тестових даних (fixtures)

| Елемент             | Рекомендація                                     |
|---------------------|--------------------------------------------------|
| src/fixtures/       | Тільки актуальні testData.ts, users.ts          |
| Генерація даних     | faker.js або test-data-bot для випадкових даних |
| Константи маршрутів | Винести в src/constants/routes.ts               |

---

### ✅ 6. Перевірка конфігів Playwright

| Компонент                | Рекомендація                                          |
|--------------------------|-------------------------------------------------------|
| playwright.config.ts     | Паралельність, таймаути, retries                      |
| video/screenshots        | recordVideo + screenshots: 'only-on-failure'          |
| reporters                | ['list', ['allure-playwright']]                      |

---

### ✅ 7. Фінальний чек-лист перевірки однієї спеки

| Перевірка                                           | ✅ / ❌ |
|-----------------------------------------------------|--------|
| Є Page Object для цієї спеки                        |        |
| Файл і клас Page Object мають правильну назву       |        |
| Всі локатори private, методи async                  |        |
| Є goto() у Page Object                              |        |
| Є beforeEach з ініціалізацією Page Object           |        |
| Використано allure.step() для кожної дії            |        |
| Є ассерти з expect()                                |        |
| Імена тестів у форматі should ...                   |        |
| Всі дії в тестах описані в JSDoc                   |        |
| Додані лейбли/епіки/severity до Allure (опціонально)|        |

---

**Готовий до роботи після повернення цього файлу!**
