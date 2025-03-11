
# 📚 Automated Testing Project

---

## 🔎 Overview

Проєкт демонструє автоматизацію UI-тестування сайту [The Internet Herokuapp](https://the-internet.herokuapp.com/) з використанням **Playwright** + **TypeScript**.

### Основна функціональність:
- Перевірка A/B Testing варіантів сторінки.
- Тестування Add/Remove Elements.
- Перевірка авторизації Basic Auth.
- Перевірка наявності зламаних зображень (Broken Images).
- Тести навігації з головної сторінки.

---

## 🛠️ Project technologies

| Технологія     | Опис                                                              |
|----------------|-------------------------------------------------------------------|
| **Playwright** | Фреймворк для е2е автоматизації веб-додатків                     |
| **TypeScript** | Додає типізацію і підвищує стабільність коду                     |
| **Node.js**    | Середовище виконання для запуску тестів                          |
| **HTML Reports** | Автоматична генерація репортів після виконання тестів            |

---

## ⚙️ Project configuration

Файл конфігурації: `playwright.config.ts`

### Основні параметри:
- **baseURL**: `https://the-internet.herokuapp.com/`
- **timeout**: 30 секунд на кожен тест
- **retries**: 1 (автоматичний перезапуск при фейлі)
- **reporter**: `html` (вбудований HTML-репорт)

### Структура проєкту:
```
Test_Project_v2/
├── pages/                   # Page Object класи
├── tests/                   # Тестові сценарії
├── playwright.config.ts     # Конфігурація Playwright
├── tsconfig.json            # Конфігурація TypeScript
├── package.json             # Скрипти і залежності
```

---

## ▶️ Run tests

### 1. Встановити залежності
```bash
npm install
```

### 2. Запустити всі тести
```bash
npx playwright test
```

### 3. Запустити конкретний тест
```bash
npx playwright test tests/basicAuth.spec.ts
```

### 4. Запустити тести в headed-режимі (з UI браузера)
```bash
npx playwright test --headed
```

### 5. Запустити тест в debug-режимі (з DevTools)
```bash
npx playwright test --debug
```

---

## 👀 Observe results

### ✅ HTML Report
Після виконання тестів створюється репорт в папці `playwright-report`.

Відкрити HTML-репорт:
```bash
npx playwright show-report
```

### ✅ Термінал
Після запуску тестів зʼявляється докладна інформація по кожному тесту:
- що виконується
- які перевірки проходять / падають
- скільки часу зайняло виконання

---

## ℹ️ Additional info

### ✅ Best Practices
- Використовується **Page Object Model** для структурування коду.
- `test.step()` ➜ деталізує кроки в тестах і репортах.
- Локатори обгорнуті в Page Object ➜ зменшення дублювання.
- Всі тести з чіткими `expect()` ➜ надійні перевірки результату.
- `beforeEach()` ➜ підготовка тестового середовища.

### ✅ Що покращити:
- Винести креденшіали (`username`, `password`) у `.env` або `config.ts`.
- Підключити **Allure Reports** для кастомного репортингу.
- Інтегрувати з CI/CD (GitHub Actions, Jenkins).
- Додати параметризацію тестів (`test.each()`).
- Розширити покриття тестами ➜ API / Mobile / Accessibility тести.
