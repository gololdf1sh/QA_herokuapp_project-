import { Page, BrowserContext, expect } from '@playwright/test';

/**
 * Клас для взаємодії зі сторінкою A/B Test
 */
export class AbTestPage {
    page: Page; // Об'єкт сторінки Playwright
    private headingLocator = 'h3'; // Локатор для заголовка на сторінці

    /**
     * Ініціалізація класу AbTestPage
     * @param page - об'єкт сторінки Playwright
     */
    constructor(page: Page) {
        this.page = page; // Присвоюємо сторінку, з якою працюватиме клас
    }

    /**
     * Перехід на сторінку A/B Test
     */
    async goto() {
        await this.page.goto('/abtest');
    }

    /**
     * Отримання тексту заголовка h3 на сторінці
     * @returns текст заголовка (типу string)
     */
    async getHeadingText(): Promise<string> {
        return this.page.locator(this.headingLocator).textContent();
    }

    /**
     * Перевірка, що заголовок змінюється після очищення кешу та куків
     * @param context - об'єкт BrowserContext для управління куками
     * @param attempts - кількість спроб перевірки (за замовчуванням 10)
     */
    async checkHeadlineWithCacheClear(context: BrowserContext, attempts: number = 10) {
        const firstHeading = await this.getHeadingText(); // Зчитуємо початковий заголовок
        console.log(`📝 First headline: ${firstHeading}`);

        // Запускаємо цикл перевірок
        for (let i = 0; i < attempts; i++) {
            console.log(`🔄 Attempt ${i + 1}: Clearing cache and reloading...`);

            // Очищення куків браузера
            await context.clearCookies();

            // Очищення кешу браузера через API caches
            await this.page.evaluate(() =>
                caches.keys().then(keys => keys.forEach(key => caches.delete(key)))
            );

            // Додаємо заголовок, щоб примусово заблокувати кешування
            await this.page.setExtraHTTPHeaders({
                'Cache-Control': 'no-cache, no-store, must-revalidate'
            });

            // Перезавантажуємо сторінку
            await this.page.reload();

            // Перевіряємо, що новий заголовок не є null
            const newHeading = await this.getHeadingText();
            expect(newHeading).not.toBeNull();
        }
    }
}
