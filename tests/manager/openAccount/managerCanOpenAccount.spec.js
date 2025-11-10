import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test.describe('Manager - Open Account', () => {
  let bankManagerPage;
  let addCustomerPage;
  let openAccountPage;
  let customersListPage;
  let firstName;
  let lastName;
  let postalCode;

  test.beforeEach(async ({ page }) => {
    firstName = faker.person.firstName();
    lastName = faker.person.lastName();
    postalCode = faker.location.zipCode();

    bankManagerPage = new BankManagerMainPage(page);
    addCustomerPage = new AddCustomerPage(page);
    openAccountPage = new OpenAccountPage(page);
    customersListPage = new CustomersListPage(page);

    await bankManagerPage.open();
    await bankManagerPage.choosePage('Add Customer');
    await addCustomerPage.fillFirstName(firstName);
    await addCustomerPage.fillLastName(lastName);
    await addCustomerPage.fillPostalCode(postalCode);

    page.on('dialog', dialog => dialog.accept());
    await addCustomerPage.clickOnAddCustomerButton();
  });

  test('Assert manager can open account for customer', async ({ page }) => {
    await bankManagerPage.choosePage('Open Account');
    await openAccountPage.selectCustomer({firstName, lastName});
    await openAccountPage.selectCurrency('Dollar');
    await openAccountPage.clickOnProcessButton();

    await page.reload();
    
    await bankManagerPage.choosePage('Customers');
    await customersListPage.assertAccountNumberIsVisible(firstName, lastName);
  });
});
