import { Page, expect, Download } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

export class FileDownloadPage {
    readonly page: Page;
    private downloadLinkSelector: string = 'a[href*="download"]'; // Лінк для завантаження

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Переходимо на сторінку File Download
     */
    async goto(): Promise<void> {
        await this.page.goto('https://the-internet.herokuapp.com/download');
    }

    /**
     * Завантажуємо перший доступний файл
     * @returns шлях до завантаженого файлу
     */
    async downloadFirstFile(): Promise<string> {
        const [ download ] = await Promise.all([
            this.page.waitForEvent('download'),                    // Чекаємо завантаження
            this.page.locator(this.downloadLinkSelector).first().click() // Клік по першому лінку
        ]);

        const downloadPath = await download.path(); // Отримуємо шлях до завантаженого файлу
        const suggestedFilename = download.suggestedFilename();

        // Копіюємо файл в папку проекту
        const downloadsFolder = path.join(__dirname, '../../../downloads');
        if (!fs.existsSync(downloadsFolder)) {
            fs.mkdirSync(downloadsFolder);
        }

        const savedFilePath = path.join(downloadsFolder, suggestedFilename);
        await download.saveAs(savedFilePath);

        return savedFilePath;
    }

    /**
     * Перевіряємо, що файл існує
     */
    async assertFileExists(filePath: string): Promise<void> {
        const fileExists = fs.existsSync(filePath);
        expect(fileExists).toBeTruthy();
    }

    /**
     * Перевіряємо, що файл не пустий (опціонально)
     */
    async assertFileNotEmpty(filePath: string): Promise<void> {
        const stats = fs.statSync(filePath);
        expect(stats.size).toBeGreaterThan(0);
    }
}
