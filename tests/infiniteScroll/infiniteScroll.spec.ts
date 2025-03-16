import { test } from '@playwright/test';
import { InfiniteScrollPage } from '../../src/pages/InfiniteScrollPage.page';

/**
 * Тестова сьют для сторінки Infinite Scroll
 */
test.describe('Infinite Scroll Page', () => {
    let infiniteScrollPage: InfiniteScrollPage;

    test.beforeEach(async ({ page }) => {
        infiniteScrollPage = new InfiniteScrollPage(page);

        await test.step('Перейти на сторінку Infinite Scroll', async () => {
            await infiniteScrollPage.goto();
        });
    });

    test('should load new paragraphs when scrolling down', async () => {
        let initialCount: number;

        await test.step('Отримати початкову кількість параграфів', async () => {
            initialCount = await infiniteScrollPage.getParagraphsCount();
        });

        const scrollTimes = 3;
        let currentExpectedCount = initialCount;

        for (let i = 1; i <= scrollTimes; i++) {
            await test.step(`Скрол №${i}: скролимо і перевіряємо кількість параграфів`, async () => {
                currentExpectedCount += 1; // очікуємо додавання одного параграфу після скролу

                await infiniteScrollPage.scrollDownAndExpectParagraphs(1000, currentExpectedCount);
            });
        }

        await test.step('Фінальна перевірка кількості параграфів після скролів', async () => {
            await infiniteScrollPage.expectParagraphsCount(currentExpectedCount);
        });
    });
});
