import { test, expect } from '@playwright/test';
import { ShadowDOMPage } from '../../src/pages/ShadowDOMPage.page';

test.describe('Shadow DOM Page', () => {
    let shadowDomPage: ShadowDOMPage;

    test.beforeEach(async ({ page }) => {
        shadowDomPage = new ShadowDOMPage(page);
        await shadowDomPage.goto();
    });

    test('Контент у першому shadow dom елементі видно', async () => {
        await shadowDomPage.assertFirstShadowParagraph("Let's have some different text!");
    });

    test('Контент у другому shadow dom елементі містить всі очікувані значення', async () => {
        await shadowDomPage.assertSecondShadowParagraphContains([
            "In a list!",
            "My default text"
        ]);
    });
});
