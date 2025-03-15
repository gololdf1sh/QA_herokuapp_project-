import { test } from '@playwright/test';
import { NestedFramesPage } from '../../src/pages/NestedFramesPage.page';

test.describe('Nested Frames', () => {
    let nestedFramesPage: NestedFramesPage;

    test.beforeEach(async ({ page }) => {
        nestedFramesPage = new NestedFramesPage(page);
        await nestedFramesPage.goto();
    });

    test('Перевірка тексту у LEFT фреймі', async () => {
        await nestedFramesPage.assertFrameText('left', 'LEFT');
    });

    test('Перевірка тексту у MIDDLE фреймі', async () => {
        await nestedFramesPage.assertFrameText('middle', 'MIDDLE');
    });

    test('Перевірка тексту у RIGHT фреймі', async () => {
        await nestedFramesPage.assertFrameText('right', 'RIGHT');
    });

    test('Перевірка тексту у BOTTOM фреймі', async () => {
        await nestedFramesPage.assertFrameText('bottom', 'BOTTOM');
    });
});
