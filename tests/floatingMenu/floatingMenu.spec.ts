import { test, expect } from '@playwright/test';
import { FloatingMenuPage } from '../../src/pages/FloatingMenuPage.page';

test.describe('Floating Menu Page', () => {
    let floatingMenuPage: FloatingMenuPage;

    test.beforeEach(async ({ page }) => {
        floatingMenuPage = new FloatingMenuPage(page);

        await test.step('Перейти на сторінку Floating Menu', async () => {
            await floatingMenuPage.goto();
        });
    });

    /**
     * Тест 1: Перевірка заголовка сторінки
     */
    test('Повинен відображати правильний заголовок сторінки', async ({ page }) => {
        await test.step('Отримати заголовок', async () => {
            const title = await page.title();
            expect(title).toBe('The Internet');
        });
    });

    /**
     * Тест 2: Перевірка видимості меню при завантаженні сторінки
     */
    test('Меню видиме при завантаженні сторінки', async () => {
        await test.step('Перевірити видимість меню', async () => {
            await floatingMenuPage.assertMenuVisible();
        });

        await test.step('Перевірити, що всі пункти меню відображаються', async () => {
            await floatingMenuPage.assertAllMenuLinksVisible();
        });
    });

    /**
     * Тест 3: Перевірка видимості меню після прокручування сторінки вниз
     */
    test('Меню залишається видимим після прокручування сторінки', async () => {
        await test.step('Прокрутити сторінку вниз', async () => {
            await floatingMenuPage.scrollPageDown();
        });

        await test.step('Перевірити, що меню все ще видиме після прокручування', async () => {
            await floatingMenuPage.assertMenuVisible();
        });
    });

    /**
     * Тест 4: Клік по пункту меню "About" ➔ перевірка переходу
     */
    test('Клік по пункту меню "About" виконується коректно', async ({ page }) => {
        await test.step('Клік по пункту "About"', async () => {
            await floatingMenuPage.clickMenuLink('About');
        });

        await test.step('Перевірити, що URL змінився на #about', async () => {
            await expect(page).toHaveURL(/#about/);
        });
    });
});
