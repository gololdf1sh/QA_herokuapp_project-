import { Page, Locator, expect } from '@playwright/test';

export class NotificationMessagesPage {
    readonly page: Page;
    readonly clickHereLink: Locator;
    readonly notification: Locator;

    constructor(page: Page) {
        this.page = page;
        this.clickHereLink = page.locator('a[href="/notification_message"]');
        this.notification = page.locator('#flash');
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/notification_message_rendered');
    }

    async clickHere() {
        await this.clickHereLink.click();
    }

    async getNotificationMessage(): Promise<string> {
        const text = await this.notification.innerText();
        return text.replace('×', '').trim(); // Прибираємо кнопку закриття і пробіли
    }

    async assertNotificationInExpectedList(expectedMessages: string[]) {
        const message = await this.getNotificationMessage();
        expect(expectedMessages).toContain(message);
    }
}
