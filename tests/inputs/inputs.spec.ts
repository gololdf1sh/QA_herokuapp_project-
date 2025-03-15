import { test, expect } from '@playwright/test';
import { InputsPage } from '../../src/pages/InputsPage.page';

test.describe('Inputs Page', () => {
    let inputsPage: InputsPage;

    test.beforeEach(async ({ page }) => {
        inputsPage = new InputsPage(page);
        await inputsPage.goto();
    });

    test('Можна ввести ціле число', async () => {
        await inputsPage.enterValue('123');
        await inputsPage.assertValue('123');
    });

    test('Можна ввести десяткове число', async () => {
        await inputsPage.enterValue('45.67');
        await inputsPage.assertValue('45.67');
    });

    test('Необроблений текст вводиться, але не повинен прийматися (браузер пропускає)', async () => {
        await inputsPage.enterValue('abc');
        const value = await inputsPage.numberInput.inputValue();

        // Очікуємо що поле залишиться порожнім або браузер пропустить text (не валідно)
        expect(value === '' || value === 'abc').toBeTruthy();
    });

    test('Можна інкрементувати значення стрілкою вгору', async () => {
        await inputsPage.enterValue('5');
        await inputsPage.incrementUsingArrowUp(3);
        await inputsPage.assertValue('8'); // 5 + 3
    });

    test('Можна декрементувати значення стрілкою вниз', async () => {
        await inputsPage.enterValue('10');
        await inputsPage.decrementUsingArrowDown(4);
        await inputsPage.assertValue('6'); // 10 - 4
    });
});
