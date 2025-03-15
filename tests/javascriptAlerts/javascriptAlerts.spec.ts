import { test } from '@playwright/test';
import { JavaScriptAlertsPage } from '../../src/pages/JavaScriptAlertsPage.page';

test.describe('JavaScript Alerts', () => {
    let alertsPage: JavaScriptAlertsPage;

    test.beforeEach(async ({ page }) => {
        alertsPage = new JavaScriptAlertsPage(page);
        await alertsPage.goto();
    });

    test('Alert: Користувач може прийняти повідомлення', async () => {
        await alertsPage.triggerAlertAndAccept();
        await alertsPage.assertResult('You successfully clicked an alert');
    });

    test('Confirm: Користувач приймає підтвердження', async () => {
        await alertsPage.triggerConfirm(true);
        await alertsPage.assertResult('You clicked: Ok');
    });

    test('Confirm: Користувач відхиляє підтвердження', async () => {
        await alertsPage.triggerConfirm(false);
        await alertsPage.assertResult('You clicked: Cancel');
    });

    test('Prompt: Користувач вводить текст і приймає', async () => {
        const text = 'Playwright test';
        await alertsPage.triggerPrompt(text);
        await alertsPage.assertResult(`You entered: ${text}`);
    });

    test('Prompt: Користувач закриває prompt без вводу', async () => {
        await alertsPage.triggerPrompt(null);
        await alertsPage.assertResult('You entered: null');
    });
});
