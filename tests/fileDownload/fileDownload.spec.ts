import { test, expect } from '@playwright/test';
import path from 'path';
import { FileDownloadPage } from '../../src/pages/FileDownloadPage.page';

test.describe('File Download', () => {
    let fileDownloadPage: FileDownloadPage;

    test.beforeEach(async ({ page }) => {
        fileDownloadPage = new FileDownloadPage(page);
        await fileDownloadPage.goto();
    });

    test('Користувач може завантажити файл', async ({ page }, testInfo) => {
        // Папка для завантаження файлів
        const downloadsPath = testInfo.outputPath('downloads');

        // Створюємо папку (якщо нема)
        const fs = require('fs');
        if (!fs.existsSync(downloadsPath)) {
            fs.mkdirSync(downloadsPath);
        }

        const download = await fileDownloadPage.downloadFirstFile();

        const filePath = path.join(downloadsPath, download.suggestedFilename());

        await fileDownloadPage.saveDownloadTo(download, filePath);

        await fileDownloadPage.assertFileExists(filePath);

        // ✅ Перевірка розміру файлу (опційно)
        const stats = fs.statSync(filePath);
        expect(stats.size).toBeGreaterThan(0);
    });
});
