import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test.describe('Manager - Search Customer by Postal Code', () => {
  let firstName;
  let lastName;
  let postalCode;

  test.beforeEach(async ({ page }) => {
    /* 
    Pre-conditions:
    1. Open Bank Manager page
    2. Go to Add Customer page
    3. Fill the First Name.  
    4. Fill the Last Name.
    5. Fill the Postal Code.
    6. Click [Add Customer].
    */

    // Инициализируем Page Objects
    const bankManagerPage = new BankManagerMainPage(page);
    const addCustomerPage = new AddCustomerPage(page);

    // Генерируем данные для каждого теста
    firstName = faker.person.firstName();
    lastName = faker.person.lastName();
    postalCode = faker.location.zipCode();

    // Pre-conditions: Создаем клиента
    await bankManagerPage.open();
    await bankManagerPage.choosePage('Add Customer');
    await addCustomerPage.fillFirstName(firstName);
    await addCustomerPage.fillLastName(lastName);
    await addCustomerPage.fillPostalCode(postalCode);
    await addCustomerPage.clickOnAddCustomerButton();
  });

  test('Assert manager can search customer by postal code', async ({ page }) => {
    /* 
    Test:
    1. Go to Customers page
    2. Fill the postal code to the search field
    3. Assert customer row is present in the table. 
    4. Assert no other rows is present in the table.
    */

    // Инициализируем Page Objects
    const bankManagerPage = new BankManagerMainPage(page);
    const customersListPage = new CustomersListPage(page);

    // Test: Ищем клиента по почтовому коду
    await bankManagerPage.choosePage('Customers');
    await customersListPage.fillSearchCustomerField(postalCode);
    await customersListPage.assertCustomerOnTheTable(`${firstName} ${lastName}`);
    await customersListPage.assertOnlyOneCustomerRowOnPage();
  });
});
