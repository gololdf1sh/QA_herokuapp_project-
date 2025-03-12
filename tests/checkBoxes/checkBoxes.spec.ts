import { test, expect } from '@playwright/test';
import { CheckBoxesPage } from '../../src/pages/checkBoxesPage.page';

test.describe('Checkboxes Page', () => {

    let checkboxesPage: CheckBoxesPage;

    // Перед кожним тестом відкриваємо сторінку
    test.beforeEach(async ({ page }) => {
        checkboxesPage = new CheckBoxesPage(page);
        await checkboxesPage.open();
    });

    test('Перевірка дефолтного стану чекбоксів', async () => {
        // Перевіряємо, що перший чекбокс НЕ вибраний
        expect(await checkboxesPage.isCheckbox1Checked()).toBe(false);
        // Другий чекбокс вибраний
        expect(await checkboxesPage.isCheckbox2Checked()).toBe(true);
    });

    test('Клік по першому чекбоксу - стає вибраним', async () => {
        await checkboxesPage.toggleCheckbox1();
        expect(await checkboxesPage.isCheckbox1Checked()).toBe(true);
    });

    test('Клік по другому чекбоксу - знімає вибір', async () => {
        await checkboxesPage.toggleCheckbox2();
        expect(await checkboxesPage.isCheckbox2Checked()).toBe(false);
    });

    test('Тогл обох чекбоксів', async () => {
        // Перемикаємо перший чекбокс
        await checkboxesPage.toggleCheckbox1();
        expect(await checkboxesPage.isCheckbox1Checked()).toBe(true);

        // Перемикаємо другий чекбокс
        await checkboxesPage.toggleCheckbox2();
        expect(await checkboxesPage.isCheckbox2Checked()).toBe(false);
    });

});
