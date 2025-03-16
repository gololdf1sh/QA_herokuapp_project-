import { test } from '@playwright/test';
import { NestedFramesPage } from '../../src/pages/NestedFramesPage.page';

/**
 * Тестова сьют для перевірки контенту у вкладених фреймах на сторінці Nested Frames
 */
test.describe('Nested Frames Page', () => {
    let nestedFramesPage: NestedFramesPage;

    test.beforeEach(async ({ page }) => {
        // Ініціалізація NestedFramesPage перед кожним тестом
        nestedFramesPage = new NestedFramesPage(page);

        await test.step('Перейти на сторінку Nested Frames', async () => {
            await nestedFramesPage.goto();
        });
    });

    test('should display correct text in the LEFT frame', async () => {
        await test.step('Перевірити текст "LEFT" у лівому фреймі', async () => {
            await nestedFramesPage.expectFrameText('left', 'LEFT');
        });

        /**
         * Очікуваний результат:
         * У лівому фреймі відображається текст "LEFT".
         */
    });

    test('should display correct text in the MIDDLE frame', async () => {
        await test.step('Перевірити текст "MIDDLE" у середньому фреймі', async () => {
            await nestedFramesPage.expectFrameText('middle', 'MIDDLE');
        });

        /**
         * Очікуваний результат:
         * У середньому фреймі відображається текст "MIDDLE".
         */
    });

    test('should display correct text in the RIGHT frame', async () => {
        await test.step('Перевірити текст "RIGHT" у правому фреймі', async () => {
            await nestedFramesPage.expectFrameText('right', 'RIGHT');
        });

        /**
         * Очікуваний результат:
         * У правому фреймі відображається текст "RIGHT".
         */
    });

    test('should display correct text in the BOTTOM frame', async () => {
        await test.step('Перевірити текст "BOTTOM" у нижньому фреймі', async () => {
            await nestedFramesPage.expectFrameText('bottom', 'BOTTOM');
        });

        /**
         * Очікуваний результат:
         * У нижньому фреймі відображається текст "BOTTOM".
         */
    });

    test('should display correct text in all frames', async () => {
        await test.step('Перевірити всі фрейми за раз', async () => {
            await nestedFramesPage.expectAllFramesTexts({
                left: 'LEFT',
                middle: 'MIDDLE',
                right: 'RIGHT',
                bottom: 'BOTTOM'
            });
        });

        /**
         * Очікуваний результат:
         * У всіх фреймах відображаються відповідні тексти:
         * - LEFT → "LEFT"
         * - MIDDLE → "MIDDLE"
         * - RIGHT → "RIGHT"
         * - BOTTOM → "BOTTOM"
         */
    });
});
