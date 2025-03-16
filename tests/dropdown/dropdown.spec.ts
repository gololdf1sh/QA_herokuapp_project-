import { test } from '@playwright/test';
import { DropdownPage } from '../../src/pages/DropdownPage.page';

/**
 * Тестова сьют для Dropdown Page
 */
test.describe('Dropdown Page', () => {
    let dropdownPage: DropdownPage;

    test.beforeEach(async ({ page }) => {
        dropdownPage = new DropdownPage(page);
    });

    /**
     * ✅ Тест: Вибір Option 1
     */
    test('should select Option 1 from dropdown', async () => {
        await test.step('Перейти на сторінку Dropdown', async () => {
            await dropdownPage.goto();
        });

        await test.step('Вибрати опцію "Option 1"', async () => {
            await dropdownPage.selectOptionByValue('1');
        });

        await test.step('Перевірити, що вибрана "Option 1"', async () => {
            await dropdownPage.expectSelectedOptionValue('1');
        });
    });

    /**
     * ✅ Тест: Вибір Option 2
     */
    test('should select Option 2 from dropdown', async () => {
        await test.step('Перейти на сторінку Dropdown', async () => {
            await dropdownPage.goto();
        });

        await test.step('Вибрати опцію "Option 2"', async () => {
            await dropdownPage.selectOptionByValue('2');
        });

        await test.step('Перевірити, що вибрана "Option 2"', async () => {
            await dropdownPage.expectSelectedOptionValue('2');
        });
    });
});
