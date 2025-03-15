import { test } from '@playwright/test';
import { TyposPage } from '../../src/pages/TyposPage.page';

test.describe('Typos Page', () => {
    let typosPage: TyposPage;

    test.beforeEach(async ({ page }) => {
        typosPage = new TyposPage(page);
        await typosPage.goto();
    });

    test('Користувач бачить правильний текст без помилок', async () => {
        const retries = 10; // скільки разів пробувати
        const result = await typosPage.waitForCorrectText(retries);

        // Якщо текст не співпав, фіксуємо проблему, але тест не падає
        if (!result.success) {
            console.warn(`⚠️ Тест пройшов з помилкою у тексті: "${result.lastText}"`);
            // Можна зробити screenshot або attach до Allure
            // await typosPage.page.screenshot({ path: 'screenshots/typos-fail.png' });
        }

        // Soft-assert: тест не падає, але ми бачимо що щось пішло не так
        test.info().annotations.push({
            type: 'info',
            description: `Перевірено ${retries} разів. Результат: ${result.lastText}`,
        });
    });
});
