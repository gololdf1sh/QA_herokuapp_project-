import { test } from '@playwright/test';
import { TyposPage } from '../../src/pages/TyposPage.page';

test.describe('Typos Page', () => {
    let typosPage: TyposPage;

    const expectedTexts = [
        "Sometimes you'll see a typo, other times you won’t.",
        "Sometimes you'll see a typo, other times you won't."
    ];

    test.beforeEach(async ({ page }) => {
        typosPage = new TyposPage(page);

        await test.step('Перейти на сторінку Typos', async () => {
            await typosPage.goto();
        });
    });

    test('should display the correct paragraph text without typos', async () => {
        await test.step('Перевірити текст абзацу на відповідність допустимим варіантам', async () => {
            await typosPage.expectCorrectedText(expectedTexts);
        });

        /**
         * Очікуваний результат:
         * На сторінці відображається один із варіантів тексту:
         * - "Sometimes you'll see a typo, other times you won’t."
         * - "Sometimes you'll see a typo, other times you won't."
         */
    });
});
