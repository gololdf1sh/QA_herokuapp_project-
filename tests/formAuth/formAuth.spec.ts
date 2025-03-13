import { test } from '@playwright/test';
import { LoginPage } from '../../src/pages/formAuthPage.page';

// Allure метки для організації
test.describe('@auth @smoke Form Authentication', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('Успішний логін з валідними даними', async () => {
        await loginPage.login('tomsmith', 'SuperSecretPassword!');
        await loginPage.assertFlashMessageContains('You logged into a secure area!');
    });

    test('Невалідний логін повертає помилку', async () => {
        await loginPage.login('invalidUser', 'SuperSecretPassword!');
        await loginPage.assertFlashMessageContains('Your username is invalid!');
    });

    test('Невалідний пароль повертає помилку', async () => {
        await loginPage.login('tomsmith', 'invalidPassword');
        await loginPage.assertFlashMessageContains('Your password is invalid!');
    });

    test('Логаут після успішного логіну', async () => {
        await loginPage.login('tomsmith', 'SuperSecretPassword!');
        await loginPage.assertFlashMessageContains('You logged into a secure area!');

        await loginPage.logout();
        await loginPage.assertFlashMessageContains('You logged out of the secure area!');
    });

});
