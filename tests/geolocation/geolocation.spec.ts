import { test } from '@playwright/test';
import { GeolocationPage } from '../../src/pages/GeolocationPage.page';

/**
 * Тестова сьют для сторінки Geolocation
 */
test.describe('Geolocation Page', () => {
    let geolocationPage: GeolocationPage;

    test.beforeEach(async ({ browser }) => {
        await test.step('Створити новий контекст з геолокацією', async () => {
            const context = await browser.newContext({
                geolocation: { latitude: 48.3794, longitude: 31.1656 }, // Координати України
                permissions: ['geolocation'],
            });

            const page = await context.newPage();
            geolocationPage = new GeolocationPage(page);

            await geolocationPage.goto();
        });
    });

    test('should display correct coordinates after clicking "Where am I?" button', async () => {
        await test.step('Натиснути кнопку "Where am I"', async () => {
            await geolocationPage.clickWhereAmI();
        });

        await test.step('Перевірити, що координати відображаються', async () => {
            await geolocationPage.expectCoordinatesAreVisible();
        });

        await test.step('Перевірити значення координат', async () => {
            await geolocationPage.expectCoordinates('48.3794', '31.1656');
        });
    });
});
