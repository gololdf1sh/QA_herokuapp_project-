
## Інструкція по створенню Pull Request та оновленню main

Ця інструкція описує повний цикл роботи з гілками після налаштування Branch Protection Rules та Playwright CI.

---

### 1. Створення нової гілки для змін

```bash
git checkout -b feature/my-new-feature
```

➡️ Назви гілок краще створювати за патернами:
- `feature/` — для нових фіч
- `bugfix/` — для виправлення багів
- `hotfix/` — для термінових виправлень

---

### 2. Внесення змін та коміти
1. Пишемо або змінюємо код/тести.
2. Перевіряємо локально:
```bash
npx playwright test
```
3. Додаємо та комітимо зміни:
```bash
git add .
git commit -m "🔥 Додав тест для логіну"
```

---

### 3. Пуш гілки на GitHub

```bash
git push origin feature/my-new-feature
```

---

### 4. Створення Pull Request
1. GitHub → `Pull requests` → `New pull request`
2. Base branch: `main`
3. Compare: `feature/my-new-feature`
4. Додаємо опис змін у PR:
```markdown
✨ Оновлення тестів логіну
- Додано перевірку logout
- Виправлено валідацію flash-повідомлення
```
5. Створюємо PR (`Create pull request`)

---

### 5. Чекаємо прогону CI та перевіряємо статус
1. Вкладка `Checks` → перевіряємо `playwright-ci`.
2. ✅ Зелене — можна мерджити
3. ❌ Червоне — фіксимо, пушимо новий коміт в цю ж гілку

---

### 6. Merge Pull Request
1. Натискаємо `Merge pull request`
2. Видаляємо гілку (`Delete branch`)
3. Оновлюємо main локально:
```bash
git checkout main
git pull origin main
```

---

## Що забезпечує цей підхід
✔ Стабільний main  
✔ Жодних прямих пушів  
✔ Автоматична перевірка через CI перед мержем

---

### Рекомендації додатково
- `Require pull request review` — обов'язковий code review.
- `Require linear history` — squash/rebase замість merge.
- Нотифікації про падіння CI → Telegram/Slack.
