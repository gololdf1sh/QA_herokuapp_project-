import { test } from '@playwright/test';
import { FramesPage } from '../../src/pages/FramesPage.page';

test.describe('Frames Page', () => {
    let framesPage: FramesPage;

    test.beforeEach(async ({ page }) => {
        framesPage = new FramesPage(page);
    });

    /**
     * Тест 1: Перевірка Middle Frame ➔ "MIDDLE"
     */
    test('Повинен перевірити текст у Middle Frame', async () => {
        await test.step('Відкрити Nested Frames', async () => {
            await framesPage.gotoNestedFrames();
        });

        await test.step('Перевірити текст у Middle Frame', async () => {
            await framesPage.assertMiddleFrameText('MIDDLE');
        });
    });

    /**
     * Тест 2: Перевірка Left Frame ➔ "LEFT"
     */
    test('Повинен перевірити текст у Left Frame', async () => {
        await test.step('Відкрити Nested Frames', async () => {
            await framesPage.gotoNestedFrames();
        });

        await test.step('Перевірити текст у Left Frame', async () => {
            await framesPage.assertLeftFrameText('LEFT');
        });
    });

    /**
     * Тест 3: Введення тексту в iFrame Editor
     */
    // test('Повинен ввести текст у iFrame Editor', async () => {
    //     const newText = 'Hello, this is Playwright test!';
    //
    //     await test.step('Відкрити iFrame Page', async () => {
    //         await framesPage.gotoIFramePage();
    //     });
    //
    //     await test.step(`Ввести текст: "${newText}"`, async () => {
    //         await framesPage.typeInEditor(newText);
    //     });
    //
    //     await test.step('Перевірити, що текст введено коректно', async () => {
    //         await framesPage.assertEditorText(newText);
    //     });
    // });

    /**
     * Тест 4: Перевірка дефолтного тексту в iFrame
     */
    test('Повинен перевірити дефолтний текст в iFrame Editor', async () => {
        await test.step('Відкрити iFrame Page', async () => {
            await framesPage.gotoIFramePage();
        });

        await test.step('Перевірити дефолтний текст', async () => {
            await framesPage.assertEditorText('Your content goes here.');
        });
    });
});
