import { test, expect } from '@playwright/test';
import { StatusCodesPage } from '../../src/pages/StatusCodesPage.page';

test.describe('Status Codes Page', () => {
    let statusCodesPage: StatusCodesPage;

    test.beforeEach(async ({ page }) => {
        statusCodesPage = new StatusCodesPage(page);
        await statusCodesPage.goto();
    });

    test('Сторінка 200 повертає правильний опис', async () => {
        await statusCodesPage.clickStatusCodeLink('200');
        await statusCodesPage.assertStatusTextContains('This page returned a 200 status code');
    });

    test('Сторінка 301 повертає правильний опис', async () => {
        await statusCodesPage.clickStatusCodeLink('301');
        await statusCodesPage.assertStatusTextContains('This page returned a 301 status code');
    });

    test('Сторінка 404 повертає правильний опис', async () => {
        await statusCodesPage.clickStatusCodeLink('404');
        await statusCodesPage.assertStatusTextContains('This page returned a 404 status code');
    });

    test('Сторінка 500 повертає правильний опис', async () => {
        await statusCodesPage.clickStatusCodeLink('500');
        await statusCodesPage.assertStatusTextContains('This page returned a 500 status code');
    });
});
