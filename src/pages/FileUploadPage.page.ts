import { Page, Locator, expect } from '@playwright/test';
import * as path from 'path';

export class FileUploadPage {
    readonly page: Page;
    private fileInput: Locator;
    private uploadButton: Locator;
    private uploadedFilesText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.fileInput = page.locator('input#file-upload'); // input type="file"
        this.uploadButton = page.locator('input#file-submit'); // кнопка Upload
        this.uploadedFilesText = page.locator('#uploaded-files'); // результат завантаження
    }

    /**
     * Переходимо на сторінку File Upload
     */
    async goto(): Promise<void> {
        await this.page.goto('https://the-internet.herokuapp.com/upload');
    }

    /**
     * Завантажуємо файл ➔ шлях відносно папки проекту
     */
    async uploadFile(fileName: string): Promise<void> {
        const filePath = path.resolve(__dirname, '../../tests/testData/' + fileName);

        // Передаємо шлях до input type="file"
        await this.fileInput.setInputFiles(filePath);
    }

    /**
     * Тиснемо кнопку Upload
     */
    async clickUpload(): Promise<void> {
        await this.uploadButton.click();
    }

    /**
     * Перевіряємо, що файл був завантажений успішно
     */
    async assertUploadedFileName(expectedFileName: string): Promise<void> {
        const actualFileName = await this.uploadedFilesText.textContent();
        expect(actualFileName?.trim()).toBe(expectedFileName);
    }
}
