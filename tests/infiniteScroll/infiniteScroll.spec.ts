import { test, expect } from '@playwright/test';
import { InfiniteScrollPage } from '../../src/pages/InfiniteScrollPage.page';

test.describe('Infinite Scroll Page', () => {
    let infiniteScrollPage: InfiniteScrollPage;

    test.beforeEach(async ({ page }) => {
        infiniteScrollPage = new InfiniteScrollPage(page);
        await infiniteScrollPage.goto();
    });

    test('Завантажуються нові параграфи при прокручуванні', async () => {
        const initialCount = await infiniteScrollPage.getParagraphsCount();
        console.log(`Initial count: ${initialCount}`);

        const scrollTimes = 3;
        let currentExpectedCount = initialCount;

        for (let i = 1; i <= scrollTimes; i++) {
            await infiniteScrollPage.scrollDown();
            currentExpectedCount += 1; // додається 1 .jscroll-added елемент за scroll
            await infiniteScrollPage.waitForNewParagraphs(currentExpectedCount);
            console.log(`After scroll ${i}, paragraphs count: ${currentExpectedCount}`);
        }

        const finalCount = await infiniteScrollPage.getParagraphsCount();
        expect(finalCount).toBe(currentExpectedCount);
    });
});
