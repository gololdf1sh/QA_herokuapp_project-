import { test, expect } from '@playwright/test';
import { DisappearingElementsPage } from '../../src/pages/DisappearingElementsPage.page';

test.describe('Disappearing Elements', () => {
    let disappearingElementsPage: DisappearingElementsPage;

    test.beforeEach(async ({ page }) => {
        disappearingElementsPage = new DisappearingElementsPage(page);
        await disappearingElementsPage.goto();
    });

    test('Всі стандартні пункти меню присутні, крім випадкових зникнень', async () => {
        const standardMenu = ['Home', 'About', 'Contact Us', 'Portfolio'];

        const items = await disappearingElementsPage.getMenuItemsText();

        // Перевірка наявності основних пунктів меню
        for (const item of standardMenu) {
            expect(items).toContain(item);
        }
    });

    test('Gallery може зникати з меню', async () => {
        let isGalleryFound = false;

        // Пробуємо до 5 разів, щоб відловити зникнення
        for (let i = 0; i < 5; i++) {
            await disappearingElementsPage.goto();
            const items = await disappearingElementsPage.getMenuItemsText();

            if (!items.includes('Gallery')) {
                isGalleryFound = true;
                break;
            }
        }

        expect(isGalleryFound).toBe(true);
    });

    test('Gallery іноді присутній у меню', async () => {
        let isGalleryPresent = false;

        // Пробуємо до 5 разів, щоб побачити "Gallery"
        for (let i = 0; i < 5; i++) {
            await disappearingElementsPage.goto();
            const items = await disappearingElementsPage.getMenuItemsText();

            if (items.includes('Gallery')) {
                isGalleryPresent = true;
                break;
            }
        }

        expect(isGalleryPresent).toBe(true);
    });
});
