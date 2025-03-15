import { test, expect, BrowserContext } from '@playwright/test';
import { GeolocationPage } from '../../src/pages/GeolocationPage.page';

test.describe('Geolocation Page', () => {
    let geolocationPage: GeolocationPage;
    let context: BrowserContext;

    test.beforeEach(async ({ browser }) => {
        // Створюємо новий контекст з геолокацією
        context = await browser.newContext({
            geolocation: { latitude: 48.3794, longitude: 31.1656 }, // Координати України
            permissions: ['geolocation']
        });

        const page = await context.newPage();
        geolocationPage = new GeolocationPage(page);

        await geolocationPage.goto();
    });

    test.afterEach(async () => {
        await context.close();
    });

    test('Показуються правильні координати після кліку', async () => {
        await geolocationPage.clickWhereAmI();

        // Очікуємо появу координат (пауза для реального завантаження)
        await geolocationPage.page.waitForTimeout(2000); // можна налаштувати на чек елементів

        await geolocationPage.assertCoordinates('48.3794', '31.1656');
    });
});
