import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test.describe('Manager - Search Customer by First Name', () => {
  let firstName;
  let lastName;
  let postalCode;

  test.beforeEach(async ({ page }) => {
    const addCustomerPage = new AddCustomerPage(page);
    
    firstName = faker.person.firstName();
    lastName = faker.person.lastName();
    postalCode = faker.location.zipCode();

    await addCustomerPage.open();
    await addCustomerPage.fillFirstName(firstName);
    await addCustomerPage.fillLastName(lastName);
    await addCustomerPage.fillPostalCode(postalCode);
    
    page.on('dialog', dialog => dialog.accept());
    await addCustomerPage.clickOnAddCustomerButton();
  });

  test('Assert manager can search customer by first name', async ({ page }) => {
    const customersListPage = new CustomersListPage(page);

    await customersListPage.open();
    await customersListPage.fillSearchCustomerField(firstName);
    await customersListPage.assertCustomerOnTheTable(firstName);
    await customersListPage.assertOnlyOneCustomerRowOnPage();
  });
});
