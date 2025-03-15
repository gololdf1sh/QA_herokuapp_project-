import { test } from '@playwright/test';
import { FloatingMenuPage } from '../../src/pages/FloatingMenuPage.page';

test.describe('Floating Menu', () => {
    let floatingMenuPage: FloatingMenuPage;

    test.beforeEach(async ({ page }) => {
        floatingMenuPage = new FloatingMenuPage(page);
        await floatingMenuPage.goto();
    });

    test('Меню залишається видимим при скролі', async () => {
        // Скролимо сторінку вниз
        await floatingMenuPage.scrollToBottom();

        // Перевіряємо, що меню видиме навіть після скролу
        await floatingMenuPage.assertMenuIsVisible();
    });

    test('Користувач може натискати на Home', async () => {
        await floatingMenuPage.clickHomeLink();
        await floatingMenuPage.assertUrlContains('home');
    });

    test('Користувач може натискати на News', async () => {
        await floatingMenuPage.clickNewsLink();
        await floatingMenuPage.assertUrlContains('news');
    });

    test('Користувач може натискати на Contact', async () => {
        await floatingMenuPage.clickContactLink();
        await floatingMenuPage.assertUrlContains('contact');
    });
});

