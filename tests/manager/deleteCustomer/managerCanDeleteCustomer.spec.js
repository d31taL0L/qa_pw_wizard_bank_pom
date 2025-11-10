import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test.describe('Manager - Delete Customer', () => {
  let bankManagerPage;
  let addCustomerPage;
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
    customersListPage = new CustomersListPage(page);

    await bankManagerPage.open();
    await bankManagerPage.choosePage('Add Customer');
    await addCustomerPage.fillFirstName(firstName);
    await addCustomerPage.fillLastName(lastName);
    await addCustomerPage.fillPostalCode(postalCode);
    await addCustomerPage.clickOnAddCustomerButton();
  });

  test('Assert manager can delete customer', async ({ page }) => {

    await bankManagerPage.choosePage('Customers');
    await customersListPage.clickOnDeleteButton(firstName, lastName);
    
    await page.reload();
    
    await customersListPage.assertCustomerRowIsHidden(firstName, lastName);
  });
});
