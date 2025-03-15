import { Page, Locator, expect } from '@playwright/test';

export class GeolocationPage {
    readonly page: Page;
    readonly whereAmIButton: Locator;
    readonly latitudeText: Locator;
    readonly longitudeText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.whereAmIButton = page.locator('button[onclick="getLocation()"]');
        this.latitudeText = page.locator('#lat-value');
        this.longitudeText = page.locator('#long-value');
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/geolocation');
    }

    async clickWhereAmI() {
        await this.whereAmIButton.click();
    }

    async getLatitude(): Promise<string> {
        return await this.latitudeText.innerText();
    }

    async getLongitude(): Promise<string> {
        return await this.longitudeText.innerText();
    }

    async assertCoordinates(expectedLat: string, expectedLong: string) {
        const lat = await this.getLatitude();
        const long = await this.getLongitude();

        expect(lat).toBe(expectedLat);
        expect(long).toBe(expectedLong);
    }
}
