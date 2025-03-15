import { Page, Locator, expect } from '@playwright/test';

export class FileUploadPage {
    readonly page: Page;
    readonly uploadInput: Locator;
    readonly uploadButton: Locator;
    readonly uploadedFiles: Locator;

    constructor(page: Page) {
        this.page = page;
        this.uploadInput = page.locator('#file-upload');
        this.uploadButton = page.locator('#file-submit');
        this.uploadedFiles = page.locator('#uploaded-files');
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/upload');
    }

    async uploadFile(filePath: string) {
        // Заповнюємо поле вибору файлу
        await this.uploadInput.setInputFiles(filePath);
        // Натискаємо кнопку Submit
        await this.uploadButton.click();
    }

    async assertFileUploaded(fileName: string) {
        // Перевіряємо, що ім'я завантаженого файлу відображається
        await expect(this.uploadedFiles).toHaveText(fileName);
    }
}
