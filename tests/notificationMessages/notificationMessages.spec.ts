import { test, expect } from '@playwright/test';
import { NotificationMessagesPage } from '../../src/pages/NotificationMessagesPage.page';

test.describe('Notification Messages Page', () => {
    let notificationMessagesPage: NotificationMessagesPage;
    const expectedMessages = [
        'Action successful',
        'Action unsuccesful, please try again',
        'Action unsuccessful'
    ];

    test.beforeEach(async ({ page }) => {
        notificationMessagesPage = new NotificationMessagesPage(page);
        await notificationMessagesPage.goto();
    });

    test('Перевірка, що зʼявляється повідомлення зі списку можливих', async () => {
        await notificationMessagesPage.clickHere();
        await notificationMessagesPage.assertNotificationInExpectedList(expectedMessages);
    });

    test('Можна клікати декілька разів і перевіряти повідомлення', async () => {
        for (let i = 0; i < 5; i++) {
            await notificationMessagesPage.clickHere();
            await notificationMessagesPage.assertNotificationInExpectedList(expectedMessages);
        }
    });
});
