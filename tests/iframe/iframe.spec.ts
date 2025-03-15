import { test } from '@playwright/test';
import { IFramePage } from '../../src/pages/IFramePage.page';

test.describe('iFrame - WYSIWYG Editor', () => {
    let iFramePage: IFramePage;

    test.beforeEach(async ({ page }) => {
        iFramePage = new IFramePage(page);
        await iFramePage.goto();
    });

    test('Користувач може очистити текст у редакторі', async () => {
        await iFramePage.clearEditor();
        await iFramePage.assertEditorText('');
    });

    test('Користувач може ввести новий текст у редакторі', async () => {
        const newText = 'Це тестовий текст від Playwright!';
        await iFramePage.clearEditor();
        await iFramePage.enterText(newText);
        await iFramePage.assertEditorText(newText);
    });
});
