import { test } from '@playwright/test';
import { DragAndDropPage } from '../../src/pages/DragAndDropPage.page';

/**
 * Тестова сьют для Drag and Drop Page
 */
test.describe('Drag And Drop Page', () => {
    let dragAndDropPage: DragAndDropPage;

    test.beforeEach(async ({ page }) => {
        dragAndDropPage = new DragAndDropPage(page);
    });

    /**
     * ✅ Тест: Перетягнути Box A у Box B
     */
    test('should drag Box A and drop into Box B', async () => {
        await test.step('Перейти на сторінку Drag and Drop', async () => {
            await dragAndDropPage.goto();
        });

        await test.step('Перетягнути Box A у Box B', async () => {
            await dragAndDropPage.dragAtoB();
        });

        await test.step('Перевірити, що Box A став B', async () => {
            await dragAndDropPage.expectColumnAText('B');
        });

        await test.step('Перевірити, що Box B став A', async () => {
            await dragAndDropPage.expectColumnBText('A');
        });
    });
});
