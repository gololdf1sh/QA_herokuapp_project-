import { test } from '@playwright/test';
import { DropdownPage } from '../../src/pages/DropdownPage.page';

test.describe('Dropdown', () => {
    let dropdownPage: DropdownPage;

    test.beforeEach(async ({ page }) => {
        dropdownPage = new DropdownPage(page);
        await dropdownPage.goto();
    });

    test('Користувач може вибрати Option 1', async () => {
        await dropdownPage.selectOptionByValue('1');
        await dropdownPage.assertSelectedOptionText('Option 1');
    });

    test('Користувач може вибрати Option 2', async () => {
        await dropdownPage.selectOptionByValue('2');
        await dropdownPage.assertSelectedOptionText('Option 2');
    });

    test('Дефолтно вибрано Select an Option', async () => {
        await dropdownPage.assertSelectedOptionText('Please select an option');
    });
});
