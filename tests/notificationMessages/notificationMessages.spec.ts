import { test } from '@playwright/test';
import { NotificationMessagesPage } from '../../src/pages/NotificationMessagesPage.page';

/**
 * Тестова сьют для перевірки відображення сповіщень після натискання "Click here"
 */
test.describe('Notification Messages Page', () => {
    let notificationMessagesPage: NotificationMessagesPage;
    const expectedMessages = [
        'Action successful',
        'Action unsuccesful, please try again',
        'Action unsuccessful'
    ];

    test.beforeEach(async ({ page }) => {
        // Ініціалізація сторінки перед кожним тестом
        notificationMessagesPage = new NotificationMessagesPage(page);

        await test.step('Перейти на сторінку Notification Messages', async () => {
            await notificationMessagesPage.goto();
        });
    });

    test('should display a valid notification message after clicking the link', async () => {
        await test.step('Клікнути "Click here" і перевірити повідомлення', async () => {
            await notificationMessagesPage.clickHereAndExpectNotification(expectedMessages);
        });

        /**
         * Очікуваний результат:
         * Після кліку на "Click here" з'являється одне з можливих повідомлень:
         * - "Action successful"
         * - "Action unsuccesful, please try again"
         * - "Action unsuccessful"
         */
    });

    test('should display a valid notification message after multiple clicks', async () => {
        for (let i = 1; i <= 5; i++) {
            await test.step(`Клік №${i}: клікнути "Click here" і перевірити повідомлення`, async () => {
                await notificationMessagesPage.clickHereAndExpectNotification(expectedMessages);
            });
        }

        /**
         * Очікуваний результат:
         * Кожного разу після натискання "Click here" має з'являтися одне з можливих повідомлень.
         */
    });
});
