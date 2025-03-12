import { Page, Locator } from '@playwright/test';

/**
 * Клас для взаємодії зі сторінкою Broken Images
 */
export class BrokenImagesPage {
    page: Page;          // Об'єкт сторінки Playwright
    private images: Locator;     // Локатор для всіх зображень <img> на сторінці

    /**
     * Ініціалізація класу BrokenImagesPage
     * @param page - об'єкт сторінки Playwright
     */
    constructor(page: Page) {
        this.page = page;

        // Локатор для всіх тегів <img> на сторінці
        this.images = this.page.locator('img');
    }

    /**
     * Перехід на сторінку зі зламаними зображеннями
     */
    async goto(): Promise<void> {
        await this.page.goto('/broken_images');
    }

    /**
     * Перевірка всіх зображень на сторінці на наявність помилок завантаження
     *
     * Логіка:
     *  - Отримуємо всі зображення
     *  - Виконуємо HTTP-запит до кожного src
     *  - Якщо статус відповіді не 200 — зображення вважається зламаним
     *
     * @returns void
     */
    async checkBrokenImages(): Promise<void> {
        // Отримуємо список елементів <img> на сторінці
        const imageElements = await this.images.all();

        // Перебираємо кожне зображення у списку
        for (const img of imageElements) {
            const imgSrc = await img.getAttribute('src'); // Отримуємо значення атрибута src

            if (!imgSrc) {
                console.log('⚠️ Зображення не має атрибута src');
                continue; // Пропускаємо, якщо src не заданий
            }

            // Виконуємо HTTP GET-запит до src зображення
            const response = await this.page.request.get(imgSrc);

            // Отримуємо HTTP-статус відповіді
            const status = response.status();

            // Логіку можна замінити на expect, але наразі просто лог
            if (status !== 200) {
                console.log(`❌ Зображення ${imgSrc} не завантажено -> Статус: ${status}`);
            } else {
                console.log(`✅ Зображення ${imgSrc} успішно завантажено`);
            }
        }
    }
}
