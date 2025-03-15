import { Page, Locator, expect, Download } from '@playwright/test';
import * as fs from 'fs';

export class FileDownloadPage {
    readonly page: Page;
    readonly firstFileLink: Locator;

    constructor(page: Page) {
        this.page = page;
        // Лінка на перший файл у списку
        this.firstFileLink = page.locator('#content a').first();
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/download');
    }

    async downloadFirstFile(): Promise<Download> {
        // Чекаємо подію завантаження
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.firstFileLink.click(),
        ]);

        return download;
    }

    async saveDownloadTo(download: Download, path: string) {
        await download.saveAs(path);
    }

    async assertFileExists(filePath: string) {
        const fileExists = fs.existsSync(filePath);
        expect(fileExists).toBeTruthy();
    }
}
