import { test } from '@playwright/test';
import { HoversPage } from '../../src/pages/HoversPage.page';

/**
 * Тестова сьют для сторінки Hovers
 */
test.describe('Hovers Page', () => {
    let hoversPage: HoversPage;

    test.beforeEach(async ({ page }) => {
        hoversPage = new HoversPage(page);

        await test.step('Перейти на сторінку Hovers', async () => {
            await hoversPage.goto();
        });
    });

    test('should display caption for the first figure when hovered', async () => {
        await test.step('Навести курсор на першу картинку і перевірити підпис', async () => {
            await hoversPage.hoverOverFigureAndExpectCaption(0, 'name: user1');
        });
    });

    test('should display caption for the second figure when hovered', async () => {
        await test.step('Навести курсор на другу картинку і перевірити підпис', async () => {
            await hoversPage.hoverOverFigureAndExpectCaption(1, 'name: user2');
        });
    });

    test('should display caption for the third figure when hovered', async () => {
        await test.step('Навести курсор на третю картинку і перевірити підпис', async () => {
            await hoversPage.hoverOverFigureAndExpectCaption(2, 'name: user3');
        });
    });
});
