import { Page, Locator } from '@playwright/test';

// Клас описує дії на сторінці Context Menu
export class ContextMenuPage {
    readonly page: Page;
    readonly hotSpot: Locator;

    constructor(page: Page) {
        this.page = page;
        // Елемент прямокутника, на який треба клікнути правою кнопкою миші
        this.hotSpot = page.locator('#hot-spot');
    }

    // Метод переходу на потрібну сторінку
    async goto() {
        await this.page.goto('/context_menu'); // Використовуємо baseURL з config
    }

    // Виконуємо правий клік по елементу
    async rightClickHotSpot() {
        console.log('Виконуємо клік правою кнопкою по hotSpot');
        await this.hotSpot.click({ button: 'right' });
    }
}
