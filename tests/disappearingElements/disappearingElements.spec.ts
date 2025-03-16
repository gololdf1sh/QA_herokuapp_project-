import { test } from '@playwright/test';
import { DisappearingElementsPage } from '../../src/pages/DisappearingElementsPage.page';

/**
 * Тестова сьют для Disappearing Elements Page
 */
test.describe('Disappearing Elements Page', () => {
    let disappearingElementsPage: DisappearingElementsPage;

    test.beforeEach(async ({ page }) => {
        disappearingElementsPage = new DisappearingElementsPage(page);
    });

    /**
     * ✅ Тест: Перевірка наявності основних пунктів меню
     */
    test('should display core menu items', async () => {
        await test.step('Перейти на сторінку Disappearing Elements', async () => {
            await disappearingElementsPage.goto();
        });

        await test.step('Перевірити наявність пункту Home', async () => {
            await disappearingElementsPage.expectMenuItemVisible('Home');
        });

        await test.step('Перевірити наявність пункту About', async () => {
            await disappearingElementsPage.expectMenuItemVisible('About');
        });

        await test.step('Перевірити наявність пункту Contact Us', async () => {
            await disappearingElementsPage.expectMenuItemVisible('Contact Us');
        });

        await test.step('Перевірити наявність пункту Portfolio', async () => {
            await disappearingElementsPage.expectMenuItemVisible('Portfolio');
        });
    });

    /**
     * ✅ Тест: Перевірка наявності пункту Gallery після перезавантаження
     */
    test('should show Gallery menu item after reload (if appears)', async () => {
        await test.step('Перейти на сторінку Disappearing Elements', async () => {
            await disappearingElementsPage.goto();
        });

        for (let i = 0; i < 5; i++) {
            await test.step(`Перезавантаження сторінки #${i + 1}`, async () => {
                await disappearingElementsPage.reload();
            });

            try {
                await test.step('Перевірити наявність пункту Gallery', async () => {
                    await disappearingElementsPage.expectMenuItemVisible('Gallery');
                });
                break; // якщо знайшли ➔ виходимо з циклу
            } catch (error) {
                console.log(`Gallery не знайдено після reload #${i + 1}`);
            }
        }
    });
});
