import { test } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';

test.describe('Manager - Login', () => {
  test('Assert manager can login', async ({ page }) => {
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

    // Открываем главную страницу
    await homePage.open();
    
    // Кликаем на кнопку Bank Manager Login
    await homePage.clickBankManagerButton();
    
    // Проверяем, что все необходимые кнопки видны
    await managerPage.assertButtonOnMainPage('Add Customer');
    await managerPage.assertButtonOnMainPage('Open Account');
    await managerPage.assertButtonOnMainPage('Customers');
  });
});
