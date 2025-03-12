import { Browser } from '@playwright/test';

export async function createAuthContext(browser: Browser, username: string, password: string) {
    return await browser.newContext({
        httpCredentials: { username, password }
    });
}
