import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test.describe('Manager - Search Customer by Last Name', () => {
  let firstName;
  let lastName;
  let postalCode;

  test.beforeEach(async ({ page }) => {
    const bankManagerPage = new BankManagerMainPage(page);
    const addCustomerPage = new AddCustomerPage(page);

    firstName = faker.person.firstName();
    lastName = faker.person.lastName();
    postalCode = faker.location.zipCode();

    await bankManagerPage.open();
    await bankManagerPage.choosePage('Add Customer');
    await addCustomerPage.fillFirstName(firstName);
    await addCustomerPage.fillLastName(lastName);
    await addCustomerPage.fillPostalCode(postalCode);
    await addCustomerPage.clickOnAddCustomerButton();
  });

  test('Assert manager can search customer by last name', async ({ page }) => {
    const customersListPage = new CustomersListPage(page);
    const bankManagerPage = new BankManagerMainPage(page);

    await bankManagerPage.choosePage('Customers');
    await customersListPage.fillSearchCustomerField(lastName);
    await customersListPage.assertCustomerOnTheTable(`${firstName} ${lastName}`);
    await customersListPage.assertOnlyOneCustomerRowOnPage();
  });
});
