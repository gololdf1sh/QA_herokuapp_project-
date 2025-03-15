import { test } from '@playwright/test';
import { DragAndDropPage } from '../../src/pages/DragAndDropPage.page';

test.describe('Drag and Drop', () => {
    let dragAndDropPage: DragAndDropPage;

    test.beforeEach(async ({ page }) => {
        dragAndDropPage = new DragAndDropPage(page);
        await dragAndDropPage.goto();
    });

    test('Користувач може перетягувати блок A на місце B', async () => {
        // Початково перевіряємо, що A зліва
        await dragAndDropPage.assertColumnOrder('A');

        // Перетягуємо
        await dragAndDropPage.dragAtoB();

        // Тепер блок A повинен бути справа (тобто, B став першим)
        await dragAndDropPage.assertColumnOrder('B');
    });
});
