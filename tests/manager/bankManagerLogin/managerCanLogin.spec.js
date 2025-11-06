import { test } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';

test('Assert manager can Login', async ({ page }) => {
  /* 
  Test:
  1. Open Wizard bank home page 
    https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login
  2. Click [Bank Manager Login]
  3. Assert button [Add Customer] is visible
  4. Assert button [Open Account] is visible
  5. Assert button [Customers] is visible
  */
  const homePage = new BankHomePage(page);
  const managerPage = new BankManagerMainPage(page);
  const addCustomerButton = 'Add Customer';
  const openAccountButton = 'Open Account';
  const customersButton = 'Customers';

  await homePage.open()
  await homePage.clickBankManagerButton();
  await managerPage.assertButtonOnMainPage(addCustomerButton);
  await managerPage.assertButtonOnMainPage(openAccountButton);
  await managerPage.assertButtonOnMainPage(customersButton);
});
