import { test } from '@playwright/test';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';

test.describe('Manager - Choose Currencies', () => {
  test('Assert manager can choose currencies for account', async ({ page }) => {
    /* 
    Test:
    1. Open the Open account page 
      https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/openAccount
    2. Select currency Dollar
    3. Assert the drop-down has value Dollar
    4. Select currency Pound
    5. Assert the drop-down has value Pound
    6. Select currency Rupee
    7. Assert the drop-down has value Rupee
    */

    const openAccountPage = new OpenAccountPage(page);
    const currencies = ['Dollar', 'Pound', 'Rupee'];

    // Открываем страницу открытия счета
    await openAccountPage.open();

    // Для каждой валюты: выбираем и проверяем
    for (const currency of currencies) {
      // Выбираем валюту
      await openAccountPage.selectCurrency(currency);
      
      // Проверяем, что валюта выбрана
      await openAccountPage.assertSelectedCurrency(currency);
    }
  });
});
