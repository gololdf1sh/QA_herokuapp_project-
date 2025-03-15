import { test } from '@playwright/test';
import { FileUploadPage } from '../../src/pages/FileUploadPage.page';

test.describe('File Upload', () => {
    let fileUploadPage: FileUploadPage;

    test.beforeEach(async ({ page }) => {
        fileUploadPage = new FileUploadPage(page);
        await fileUploadPage.goto();
    });

    test('Користувач може завантажити файл', async () => {
        const filePath = 'tests/testData/example.txt'; // Тестовий файл
        const fileName = 'example.txt';

        await fileUploadPage.uploadFile(filePath);
        await fileUploadPage.assertFileUploaded(fileName);
    });
});
