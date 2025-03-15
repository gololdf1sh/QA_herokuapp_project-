import { test, expect } from '@playwright/test';
import { HoversPage } from '../../src/pages/HoversPage.page';

test.describe('Hovers Page', () => {
    let hoversPage: HoversPage;

    test.beforeEach(async ({ page }) => {
        hoversPage = new HoversPage(page);
        await hoversPage.goto();
    });

    test('Навели на першу картинку, з\'явився підпис та кнопка', async () => {
        await hoversPage.hoverOverFigure(0); // перша картинка
        await hoversPage.assertCaptionVisible(0);
        await hoversPage.assertCaptionContains(0, 'name: user1');
    });

    test('Навели на другу картинку, з\'явився підпис та кнопка', async () => {
        await hoversPage.hoverOverFigure(1);
        await hoversPage.assertCaptionVisible(1);
        await hoversPage.assertCaptionContains(1, 'name: user2');
    });

    test('Навели на третю картинку, з\'явився підпис та кнопка', async () => {
        await hoversPage.hoverOverFigure(2);
        await hoversPage.assertCaptionVisible(2);
        await hoversPage.assertCaptionContains(2, 'name: user3');
    });
});
