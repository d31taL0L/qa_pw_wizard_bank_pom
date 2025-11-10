import { test } from '@playwright/test';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';

test.describe('Manager - Choose Currencies', () => {
  test('Assert manager can choose currencies for account', async ({ page }) => {

    const openAccountPage = new OpenAccountPage(page);
    const currencies = ['Dollar', 'Pound', 'Rupee'];

    await openAccountPage.open();

    for (const currency of currencies) {
      await openAccountPage.selectCurrency(currency);
      await openAccountPage.assertSelectedCurrency(currency);
    }
  });
});
