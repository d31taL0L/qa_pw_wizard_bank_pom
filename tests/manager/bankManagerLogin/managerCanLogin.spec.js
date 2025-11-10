import { test } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';

test.describe('Manager - Login', () => {
  test('Assert manager can login', async ({ page }) => {

    const homePage = new BankHomePage(page);
    const managerPage = new BankManagerMainPage(page);

    await homePage.open();
    
    await homePage.clickBankManagerButton();

    await managerPage.assertButtonOnMainPage('Add Customer');
    await managerPage.assertButtonOnMainPage('Open Account');
    await managerPage.assertButtonOnMainPage('Customers');
  });
});
