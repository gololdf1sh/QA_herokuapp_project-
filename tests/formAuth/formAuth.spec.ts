import { test } from '@playwright/test';
import { FormAuthPage } from '../../src/pages/FormAuthPage.page';
import { users } from '../../src/fixtures/users';

test.describe('Form Authentication Page', () => {
    let formAuthPage: FormAuthPage;

    test.beforeEach(async ({ page }) => {
        formAuthPage = new FormAuthPage(page);

        await test.step('Перейти на сторінку логіну', async () => {
            await formAuthPage.goto();
        });
    });

    /**
     * ✅ Тест 1: Успішна авторизація
     */
    test('Повинен залогінитися з валідними даними', async () => {
        await test.step('Виконати логін з валідними даними', async () => {
            await formAuthPage.login(users.valid.username, users.valid.password);
        });

        await test.step('Перевірити наявність кнопки Logout', async () => {
            await formAuthPage.assertLogoutButtonVisible();
        });

        await test.step('Перевірити повідомлення про успіх', async () => {
            await formAuthPage.assertFlashMessageContains('You logged into a secure area!');
        });
    });

    /**
     * ✅ Тест 2: Невдала авторизація
     */
    test('Не повинен залогінитися з невалідними даними', async () => {
        await test.step('Виконати логін з невалідними даними', async () => {
            await formAuthPage.login(users.invalid.username, users.invalid.password);
        });

        await test.step('Перевірити, що Logout відсутній', async () => {
            await formAuthPage.assertLogoutButtonHidden();
        });

        await test.step('Перевірити повідомлення про помилку', async () => {
            await formAuthPage.assertFlashMessageContains('Your username is invalid!');
        });
    });

    /**
     * ✅ Тест 3: Logout ➔ перевірка виходу після логіну
     */
    test('Повинен розлогінитися після натискання Logout', async () => {
        await test.step('Логін з валідними даними', async () => {
            await formAuthPage.login(users.valid.username, users.valid.password);
        });

        await test.step('Перевірити наявність кнопки Logout', async () => {
            await formAuthPage.assertLogoutButtonVisible();
        });

        await test.step('Виконати Logout', async () => {
            await formAuthPage.logout();
        });

        await test.step('Перевірити повідомлення про Logout', async () => {
            await formAuthPage.assertFlashMessageContains('You logged out of the secure area!');
        });

        await test.step('Перевірити, що кнопка Logout більше не відображається', async () => {
            await formAuthPage.assertLogoutButtonHidden();
        });
    });

    /**
     * ✅ Тест 4: Перевірка лише повідомлення (окремий тест)
     */
    test('Повинен показувати коректне повідомлення після логіну', async () => {
        await test.step('Виконати логін', async () => {
            await formAuthPage.login(users.valid.username, users.valid.password);
        });

        await test.step('Перевірити повідомлення', async () => {
            await formAuthPage.assertFlashMessageContains('You logged into a secure area!');
        });
    });
});
