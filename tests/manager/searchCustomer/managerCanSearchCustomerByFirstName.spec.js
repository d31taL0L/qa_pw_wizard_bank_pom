import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test.describe('Manager - Search Customer by First Name', () => {
  let firstName;
  let lastName;
  let postalCode;

  test.beforeEach(async ({ page }) => {
    /* 
    Pre-conditions:
    1. Open Add Customer page.
    2. Fill the First Name.  
    3. Fill the Last Name.
    4. Fill the Postal Code.
    5. Click [Add Customer].
    */
    
    // Инициализируем Page Objects внутри beforeEach
    const addCustomerPage = new AddCustomerPage(page);
    
    // Генерируем данные для каждого теста
    firstName = faker.person.firstName();
    lastName = faker.person.lastName();
    postalCode = faker.location.zipCode();

    // Pre-conditions
    await addCustomerPage.open();
    await addCustomerPage.fillFirstName(firstName);
    await addCustomerPage.fillLastName(lastName);
    await addCustomerPage.fillPostalCode(postalCode);
    await addCustomerPage.clickOnAddCustomerButton();
  });

  test('Assert manager can search customer by first name', async ({ page }) => {
    /* 
    Test:
    1. Open Customers page.
    2. Fill the firstName to the search field
    3. Assert customer row is present in the table. 
    4. Assert no other rows is present in the table.
    */

    // Инициализируем Page Object
    const customersListPage = new CustomersListPage(page);

    // Открываем страницу с клиентами
    await customersListPage.open();
    
    // Ищем клиента по имени
    await customersListPage.fillSearchCustomerField(firstName);
    
    // Проверяем, что клиент найден
    await customersListPage.assertCustomerOnTheTable(firstName);
    
    // Проверяем, что только один клиент в таблице
    await customersListPage.assertOnlyOneCustomerRowOnPage();
  });
});
