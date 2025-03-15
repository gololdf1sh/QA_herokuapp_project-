import { test } from '@playwright/test';
import { DynamicControlsPage } from '../../src/pages/DynamicControlsPage.page';

test.describe('Dynamic Controls', () => {
    let dynamicControlsPage: DynamicControlsPage;

    test.beforeEach(async ({ page }) => {
        dynamicControlsPage = new DynamicControlsPage(page);
        await dynamicControlsPage.goto();
    });

    test('Користувач може видалити чекбокс', async () => {
        await dynamicControlsPage.removeCheckbox();
        await dynamicControlsPage.assertMessageText("It's gone!");
        await dynamicControlsPage.assertCheckboxVisible(false);
    });

    test('Користувач може додати чекбокс', async () => {
        await dynamicControlsPage.removeCheckbox();
        await dynamicControlsPage.addCheckbox();
        await dynamicControlsPage.assertMessageText("It's back!");
        await dynamicControlsPage.assertCheckboxVisible(true);
    });

    test('Користувач може ввімкнути текстове поле', async () => {
        await dynamicControlsPage.enableInput();
        await dynamicControlsPage.assertMessageText("It's enabled!");
    });

    test('Користувач може вимкнути текстове поле', async () => {
        await dynamicControlsPage.enableInput(); // Спочатку увімкнемо
        await dynamicControlsPage.disableInput();
        await dynamicControlsPage.assertMessageText("It's disabled!");
    });
});
