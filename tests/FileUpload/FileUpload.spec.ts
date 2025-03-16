import { test } from '@playwright/test';
import { FileUploadPage } from '../../src/pages/FileUploadPage.page';

test.describe('File Upload Page', () => {
    let fileUploadPage: FileUploadPage;
    const fileName = 'exampleFile.txt'; // Файл з testData

    test.beforeEach(async ({ page }) => {
        fileUploadPage = new FileUploadPage(page);

        await test.step('Перейти на сторінку File Upload', async () => {
            await fileUploadPage.goto();
        });
    });

    test('Повинен завантажити файл і відобразити його імʼя', async () => {
        await test.step(`Завантажити файл "${fileName}"`, async () => {
            await fileUploadPage.uploadFile(fileName);
        });

        await test.step('Натиснути Upload', async () => {
            await fileUploadPage.clickUpload();
        });

        await test.step(`Перевірити імʼя завантаженого файлу "${fileName}"`, async () => {
            await fileUploadPage.assertUploadedFileName(fileName);
        });
    });
});
