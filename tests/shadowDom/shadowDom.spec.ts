import { test } from '@playwright/test';
import { ShadowDOMPage } from '../../src/pages/ShadowDOMPage.page';

/**
 * Тестова сьют для перевірки контенту у Shadow DOM елементах на сторінці Shadow DOM
 */
test.describe('Shadow DOM Page', () => {
    let shadowDomPage: ShadowDOMPage;

    test.beforeEach(async ({ page }) => {
        // Ініціалізація сторінки перед кожним тестом
        shadowDomPage = new ShadowDOMPage(page);

        await test.step('Перейти на сторінку Shadow DOM', async () => {
            await shadowDomPage.goto();
        });
    });

    test('should display correct text in the first shadow DOM paragraph', async () => {
        await test.step('Перевірити текст у першому shadow DOM параграфі', async () => {
            await shadowDomPage.expectFirstShadowParagraph("Let's have some different text!");
        });

        /**
         * Очікуваний результат:
         * Перший shadow DOM елемент має містити текст "Let's have some different text!".
         */
    });

    test('should display expected values in the second shadow DOM paragraph', async () => {
        await test.step('Перевірити наявність очікуваних значень у другому shadow DOM параграфі', async () => {
            await shadowDomPage.expectSecondShadowParagraphContains([
                "In a list!",
                "My default text"
            ]);
        });

        /**
         * Очікуваний результат:
         * Другий shadow DOM елемент містить обидва значення:
         * - "In a list!"
         * - "My default text"
         */
    });

    test('should validate both paragraphs in shadow DOM elements', async () => {
        await test.step('Перевірити тексти в обох shadow DOM параграфах', async () => {
            await shadowDomPage.expectShadowParagraphs(
                "Let's have some different text!",
                ["In a list!", "My default text"]
            );
        });

        /**
         * Очікуваний результат:
         * - Перший shadow DOM параграф містить "Let's have some different text!"
         * - Другий містить "In a list!" та "My default text"
         */
    });
});
