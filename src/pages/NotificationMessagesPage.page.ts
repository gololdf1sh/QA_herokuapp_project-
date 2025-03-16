import { Page, Locator, expect } from '@playwright/test';

/**
 * Клас для взаємодії зі сторінкою Notification Messages
 */
export class NotificationMessagesPage {
    readonly page: Page;

    // Приватні локатори
    private clickHereLink: Locator;
    private notification: Locator;

    constructor(page: Page) {
        this.page = page;
        this.clickHereLink = page.locator('a[href="/notification_message"]');
        this.notification = page.locator('#flash');
    }

    /**
     * Перехід на сторінку Notification Messages
     */
    async goto(): Promise<void> {
        await this.page.goto('https://the-internet.herokuapp.com/notification_message_rendered');
    }

    /**
     * Натискання на посилання Click Here для отримання нового повідомлення
     */
    async clickHere(): Promise<void> {
        await this.clickHereLink.click();
    }

    /**
     * Отримати повідомлення, що з'явилось після натискання
     * @returns Текст повідомлення без символу закриття і зайвих пробілів
     */
    async getNotificationMessage(): Promise<string> {
        const text = await this.notification.innerText();
        return text.replace('×', '').trim(); // Видаляємо кнопку закриття
    }

    /**
     * Перевірити, що повідомлення міститься у списку очікуваних
     * @param expectedMessages Масив допустимих варіантів повідомлення
     */
    async expectNotificationInExpectedList(expectedMessages: string[]): Promise<void> {
        const message = await this.getNotificationMessage();

        expect(expectedMessages, 'Повідомлення не знайдено серед очікуваних')
            .toContain(message);
    }

    /**
     * Інтегрована дія: натиснути посилання і перевірити повідомлення
     * @param expectedMessages Масив допустимих варіантів повідомлення
     */
    async clickHereAndExpectNotification(expectedMessages: string[]): Promise<void> {
        await this.clickHere();
        await this.expectNotificationInExpectedList(expectedMessages);
    }
}
