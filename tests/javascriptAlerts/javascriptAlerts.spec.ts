import { test } from '@playwright/test';
import { JavaScriptAlertsPage } from '../../src/pages/JavaScriptAlertsPage.page';

/**
 * Тестова сьют для перевірки роботи JavaScript Alert, Confirm та Prompt
 */
test.describe('JavaScript Alerts Page', () => {
    let alertsPage: JavaScriptAlertsPage;

    test.beforeEach(async ({ page }) => {
        // Ініціалізація сторінки та перехід до неї перед кожним тестом
        alertsPage = new JavaScriptAlertsPage(page);

        await test.step('Перейти на сторінку JavaScript Alerts', async () => {
            await alertsPage.goto();
        });
    });

    test('should accept JS Alert and display success message', async () => {
        await test.step('Викликати та прийняти JS Alert', async () => {
            // Викликаємо алерт, приймаємо його та перевіряємо результат
            await alertsPage.triggerAlertAndExpectResult('You successfully clicked an alert');
        });

        /**
         * Очікуваний результат:
         * На сторінці з’являється текст "You successfully clicked an alert"
         * Пояснення:
         * Це означає, що alert був успішно оброблений і користувач його прийняв.
         */
    });

    test('should accept JS Confirm and display confirmation message', async () => {
        await test.step('Викликати JS Confirm і натиснути OK', async () => {
            // Викликаємо confirm, приймаємо його та перевіряємо результат
            await alertsPage.triggerConfirmAndExpectResult(true, 'You clicked: Ok');
        });

        /**
         * Очікуваний результат:
         * Текст "You clicked: Ok" підтверджує прийняття confirm.
         */
    });

    test('should dismiss JS Confirm and display cancel message', async () => {
        await test.step('Викликати JS Confirm і натиснути Cancel', async () => {
            // Викликаємо confirm, відхиляємо його та перевіряємо результат
            await alertsPage.triggerConfirmAndExpectResult(false, 'You clicked: Cancel');
        });

        /**
         * Очікуваний результат:
         * Текст "You clicked: Cancel" означає, що користувач відхилив confirm.
         */
    });

    test('should accept JS Prompt with text and display entered text', async () => {
        const inputText = 'Playwright test';

        await test.step(`Викликати JS Prompt, ввести текст "${inputText}" і натиснути OK`, async () => {
            // Викликаємо prompt, вводимо текст та перевіряємо результат
            await alertsPage.triggerPromptAndExpectResult(inputText, `You entered: ${inputText}`);
        });

        /**
         * Очікуваний результат:
         * Текст "You entered: Playwright test" з'являється після введення тексту.
         */
    });

    test('should dismiss JS Prompt without entering text and display null message', async () => {
        await test.step('Викликати JS Prompt і натиснути Cancel', async () => {
            // Викликаємо prompt, не вводимо текст і відхиляємо prompt
            await alertsPage.triggerPromptAndExpectResult(null, 'You entered: null');
        });

        /**
         * Очікуваний результат:
         * Текст "You entered: null" означає, що prompt було відхилено без введення даних.
         */
    });
});
