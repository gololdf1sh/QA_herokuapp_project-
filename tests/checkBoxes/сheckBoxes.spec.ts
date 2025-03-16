import { test } from '@playwright/test';
import { CheckBoxesPage } from '../../src/pages/СheckBoxesPage.page';

/**
 * Тестова сьют для Checkboxes
 */
test.describe('CheckBoxes Page', () => {
    let checkBoxesPage: CheckBoxesPage;

    test.beforeEach(async ({ page }) => {
        checkBoxesPage = new CheckBoxesPage(page);
    });

    /**
     * ✅ Перевірка кількості чекбоксів
     */
    test('should display correct number of checkboxes', async () => {
        await test.step('Перейти на сторінку Checkboxes', async () => {
            await checkBoxesPage.goto();
        });

        await test.step('Перевірити кількість чекбоксів', async () => {
            await checkBoxesPage.expectCheckboxCount(2); // Заміни, якщо кількість інша
        });
    });

    /**
     * ✅ Активуємо перший чекбокс
     */
    test('should check first checkbox if not checked', async () => {
        await test.step('Перейти на сторінку Checkboxes', async () => {
            await checkBoxesPage.goto();
        });

        await test.step('Активувати перший чекбокс', async () => {
            await checkBoxesPage.setCheckboxState(0, true);
        });

        await test.step('Перевірити стан першого чекбоксу', async () => {
            await checkBoxesPage.expectCheckboxState(0, true);
        });
    });

    /**
     * ✅ Деактивуємо другий чекбокс
     */
    test('should uncheck second checkbox if checked', async () => {
        await test.step('Перейти на сторінку Checkboxes', async () => {
            await checkBoxesPage.goto();
        });

        await test.step('Деактивувати другий чекбокс', async () => {
            await checkBoxesPage.setCheckboxState(1, false);
        });

        await test.step('Перевірити стан другого чекбоксу', async () => {
            await checkBoxesPage.expectCheckboxState(1, false);
        });
    });
});
