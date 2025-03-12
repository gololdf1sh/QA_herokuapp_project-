import { Page, BrowserContext, expect } from '@playwright/test';

/**
 * Клас для взаємодії зі сторінкою A/B Test
 */
export class AbTestPage {
    page: Page; // Об'єкт сторінки Playwright

    /**
     * Локатор для заголовка на сторінці A/B Test
     */
    private headingLocator = 'h3';

    /**
     * Ініціалізація класу AbTestPage
     * @param page - об'єкт сторінки Playwright
     */
    constructor(page: Page) {
        this.page = page; // Зберігаємо передану сторінку
    }

    /**
     * Перехід на сторінку A/B Test
     *
     * @returns Promise<void>
     */
    async goto(): Promise<void> {
        await this.page.goto('/abtest');
    }

    /**
     * Отримання тексту заголовка h3 на сторінці
     *
     * @returns Promise<string> - текст заголовка
     */
    async getHeadingText(): Promise<string> {
        return this.page.locator(this.headingLocator).textContent();
    }

    /**
     * Приватний метод для очищення кешу та куків браузера.
     * Використовується для емуляції нового користувача при кожній ітерації.
     *
     * @param context - об'єкт BrowserContext для управління куками та кешем
     * @returns Promise<void>
     */
    private async clearCacheAndCookies(context: BrowserContext): Promise<void> {
        // Очищення всіх куків
        await context.clearCookies();

        // Очищення всіх кешів браузера через Cache API
        await this.page.evaluate(() =>
            caches.keys().then(keys => keys.forEach(key => caches.delete(key)))
        );

        // Встановлюємо хедери для уникнення кешування відповідей
        await this.page.setExtraHTTPHeaders({
            'Cache-Control': 'no-cache, no-store, must-revalidate'
        });
    }

    /**
     * Перевірка, що заголовок на сторінці змінюється при очищенні кешу та куків
     * (перевірка роботи A/B тестування).
     *
     * Логіка:
     * - Читаємо перший заголовок
     * - Очищаємо кеш та куки
     * - Перезавантажуємо сторінку і читаємо новий заголовок
     * - Перевіряємо, чи змінився заголовок
     *
     * @param context - об'єкт BrowserContext для очищення куків
     * @param attempts - кількість спроб перевірки (за замовчуванням 10)
     * @returns Promise<void>
     */
    async checkHeadlineWithCacheClear(context: BrowserContext, attempts: number = 10): Promise<void> {
        const firstHeading = await this.getHeadingText(); // Зчитуємо перший заголовок
        expect(firstHeading).not.toBeNull(); // Перевіряємо, що заголовок існує

        console.log(`📝 First headline: ${firstHeading}`);

        // Запускаємо перевірку кілька разів
        for (let i = 0; i < attempts; i++) {
            console.log(`🔄 Attempt ${i + 1}: clearing cache and cookies...`);

            // Очищаємо кеш і куки
            await this.clearCacheAndCookies(context);

            // Перезавантажуємо сторінку
            await this.page.reload();

            // Отримуємо новий заголовок
            const newHeading = await this.getHeadingText();
            expect(newHeading).not.toBeNull(); // Перевіряємо, що новий заголовок існує

            // Перевірка зміни заголовка
            if (newHeading !== firstHeading) {
                console.log(`✅ Headline changed on attempt ${i + 1}: ${newHeading}`);
                return; // Якщо заголовок змінився - виходимо з методу
            }
        }

        // Якщо після всіх спроб заголовок не змінився - викидаємо помилку
        throw new Error('❌ Headline did not change after multiple attempts.');
    }
}
