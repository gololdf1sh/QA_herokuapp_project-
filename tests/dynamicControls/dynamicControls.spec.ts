import { test } from '@playwright/test';
import { DynamicControlsPage } from '../../src/pages/DynamicControlsPage.page';

/**
 * Тестова сьют для Dynamic Controls Page
 */
test.describe('Dynamic Controls Page', () => {
    let dynamicControlsPage: DynamicControlsPage;

    test.beforeEach(async ({ page }) => {
        dynamicControlsPage = new DynamicControlsPage(page);
    });

    /**
     * ✅ Тест: Видалити чекбокс
     */
    test('should remove checkbox after clicking remove button', async () => {
        await test.step('Перейти на сторінку Dynamic Controls', async () => {
            await dynamicControlsPage.goto();
        });

        await test.step('Натиснути кнопку Remove', async () => {
            await dynamicControlsPage.clickRemoveAddButton();
        });

        await test.step('Перевірити, що чекбокс зник', async () => {
            await dynamicControlsPage.expectCheckboxIsGone();
        });
    });

    /**
     * ✅ Тест: Додати чекбокс назад
     */
    test('should add checkbox back after clicking add button', async () => {
        await test.step('Перейти на сторінку Dynamic Controls', async () => {
            await dynamicControlsPage.goto();
        });

        await test.step('Видалити чекбокс', async () => {
            await dynamicControlsPage.clickRemoveAddButton();
            await dynamicControlsPage.expectCheckboxIsGone();
        });

        await test.step('Додати чекбокс назад', async () => {
            await dynamicControlsPage.clickRemoveAddButton();
            await dynamicControlsPage.expectCheckboxIsBack();
        });
    });

    /**
     * ✅ Тест: Увімкнути input field
     */
    test('should enable input field after clicking enable button', async () => {
        await test.step('Перейти на сторінку Dynamic Controls', async () => {
            await dynamicControlsPage.goto();
        });

        await test.step('Натиснути кнопку Enable', async () => {
            await dynamicControlsPage.clickEnableDisableButton();
        });

        await test.step('Перевірити, що input активний', async () => {
            await dynamicControlsPage.expectInputIsEnabled();
        });
    });

    /**
     * ✅ Тест: Вимкнути input field
     */
    test('should disable input field after clicking disable button', async () => {
        await test.step('Перейти на сторінку Dynamic Controls', async () => {
            await dynamicControlsPage.goto();
        });

        await test.step('Увімкнути input', async () => {
            await dynamicControlsPage.clickEnableDisableButton();
            await dynamicControlsPage.expectInputIsEnabled();
        });

        await test.step('Вимкнути input', async () => {
            await dynamicControlsPage.clickEnableDisableButton();
            await dynamicControlsPage.expectInputIsDisabled();
        });
    });
});
