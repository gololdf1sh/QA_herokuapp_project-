import { test } from '@playwright/test';
import { FileDownloadPage } from '../../src/pages/FileDownloadPage.page';

test.describe('File Download Page', () => {
    let fileDownloadPage: FileDownloadPage;

    test.beforeEach(async ({ page }) => {
        fileDownloadPage = new FileDownloadPage(page);

        await test.step('Перейти на сторінку File Download', async () => {
            await fileDownloadPage.goto();
        });
    });

    test('Повинен завантажити файл і перевірити його існування', async () => {
        let downloadedFilePath = '';

        await test.step('Завантажити перший доступний файл', async () => {
            downloadedFilePath = await fileDownloadPage.downloadFirstFile();
        });

        await test.step('Перевірити, що файл існує', async () => {
            await fileDownloadPage.assertFileExists(downloadedFilePath);
        });

        await test.step('Перевірити, що файл не пустий', async () => {
            await fileDownloadPage.assertFileNotEmpty(downloadedFilePath);
        });
    });
});
