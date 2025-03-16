import { test } from '@playwright/test';
import { InputsPage } from '../../src/pages/InputsPage.page';

/**
 * Тестова сьют для сторінки Inputs
 */
test.describe('Inputs Page', () => {
    let inputsPage: InputsPage;

    test.beforeEach(async ({ page }) => {
        inputsPage = new InputsPage(page);

        await test.step('Перейти на сторінку Inputs', async () => {
            await inputsPage.goto();
        });
    });

    test('should allow entering an integer number', async () => {
        await test.step('Ввести ціле число і перевірити значення', async () => {
            await inputsPage.enterValueAndExpect('123');
        });
    });

    test('should allow entering a decimal number', async () => {
        await test.step('Ввести десяткове число і перевірити значення', async () => {
            await inputsPage.enterValueAndExpect('45.67');
        });
    });

    test('should not accept non-numeric text input (browser behavior)', async () => {
        await test.step('Спробувати ввести текст і перевірити значення', async () => {
            await inputsPage.enterValue('abc');

            // Специфічна перевірка, браузер може залишити порожнє поле або показати abc
            await inputsPage.expectValue(''); // або додаємо додаткову перевірку в PO при необхідності
        });
    });

    test('should increment value when pressing ArrowUp', async () => {
        await test.step('Ввести початкове значення', async () => {
            await inputsPage.enterValueAndExpect('5');
        });

        await test.step('Збільшити значення на 3', async () => {
            await inputsPage.incrementUsingArrowUp(3);
            await inputsPage.expectValue('8'); // 5 + 3
        });
    });

    test('should decrement value when pressing ArrowDown', async () => {
        await test.step('Ввести початкове значення', async () => {
            await inputsPage.enterValueAndExpect('10');
        });

        await test.step('Зменшити значення на 4', async () => {
            await inputsPage.decrementUsingArrowDown(4);
            await inputsPage.expectValue('6'); // 10 - 4
        });
    });
});
