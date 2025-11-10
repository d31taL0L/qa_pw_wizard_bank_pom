import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test.describe('Manager - Add New Customer', () => {
  test('Assert manager can add new customer', async ({ page }) => {

    const addCustomerPage = new AddCustomerPage(page);
    const customersListPage = new CustomersListPage(page);
    
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const postalCode = faker.location.zipCode();
    
    await addCustomerPage.open();
    await addCustomerPage.fillFirstName(firstName);
    await addCustomerPage.fillLastName(lastName);
    await addCustomerPage.fillPostalCode(postalCode);
    await addCustomerPage.clickOnAddCustomerButton();
    
    await page.reload();
    
    await customersListPage.clickOnCustomerButton();
    
    await customersListPage.assertFirstName(firstName, lastName);
    await customersListPage.assertLastName(firstName, lastName);
    await customersListPage.assertPostalCode(firstName, lastName, postalCode);
    await customersListPage.assertNoAccountNumber(firstName, lastName);
  });
});