import { Page, expect, Locator } from '@playwright/test';

/**
 * Клас для взаємодії зі сторінкою Geolocation
 */
export class GeolocationPage {
    readonly page: Page;

    private whereAmIButton: Locator;
    private latitudeText: Locator;
    private longitudeText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.whereAmIButton = page.locator('button[onclick="getLocation()"]');
        this.latitudeText = page.locator('#lat-value');
        this.longitudeText = page.locator('#long-value');
    }

    /**
     * Перейти на сторінку Geolocation
     */
    async goto(): Promise<void> {
        await this.page.goto('https://the-internet.herokuapp.com/geolocation');
    }

    /**
     * Натискає на кнопку "Where am I?"
     */
    async clickWhereAmI(): Promise<void> {
        await this.whereAmIButton.click();
    }

    /**
     * Отримати значення широти
     */
    async getLatitude(): Promise<string> {
        return await this.latitudeText.innerText();
    }

    /**
     * Отримати значення довготи
     */
    async getLongitude(): Promise<string> {
        return await this.longitudeText.innerText();
    }

    /**
     * Перевіряє, що координати відображаються на сторінці
     */
    async expectCoordinatesAreVisible(): Promise<void> {
        await expect(this.latitudeText, 'Latitude is not visible').toBeVisible();
        await expect(this.longitudeText, 'Longitude is not visible').toBeVisible();
    }

    /**
     * Перевіряє координати широти та довготи
     * @param expectedLat Очікувана широта
     * @param expectedLong Очікувана довгота
     */
    async expectCoordinates(expectedLat: string, expectedLong: string): Promise<void> {
        const lat = await this.getLatitude();
        const long = await this.getLongitude();

        await expect(lat, 'Latitude does not match').toBe(expectedLat);
        await expect(long, 'Longitude does not match').toBe(expectedLong);
    }
}
