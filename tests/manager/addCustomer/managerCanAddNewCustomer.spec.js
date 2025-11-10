import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test.describe('Manager - Add New Customer', () => {
  test('Assert manager can add new customer', async ({ page }) => {
    /* 
    Test:
    1. Open add customer page by link
      https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust
    2. Fill the First Name.  
    3. Fill the Last Name.
    4. Fill the Postal Code.
    5. Click [Add Customer].
    6. Reload the page (This is a simplified step to close the popup)
    7. Click [Customers] button.
    8. Assert the customer First Name is present in the table. 
    9. Assert the customer Last Name is present in the table. 
    10. Assert the customer Postal Code is present in the table. 
    11. Assert there is no account number for the new customer. 
    */

    const addCustomerPage = new AddCustomerPage(page);
    const customersListPage = new CustomersListPage(page);
    
    // Генерируем тестовые данные
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const postalCode = faker.location.zipCode();
    
    // Открываем страницу и добавляем клиента
    await addCustomerPage.open();
    await addCustomerPage.fillFirstName(firstName);
    await addCustomerPage.fillLastName(lastName);
    await addCustomerPage.fillPostalCode(postalCode);
    await addCustomerPage.clickOnAddCustomerButton();
    
    // Закрываем popup перезагрузкой
    await page.reload();
    
    // Переходим на страницу клиентов
    await customersListPage.clickOnCustomerButton();
    
    // Проверяем данные КОНКРЕТНОГО клиента (не последней строки)
    await customersListPage.assertFirstName(firstName, lastName);
    await customersListPage.assertLastName(firstName, lastName);
    await customersListPage.assertPostalCode(firstName, lastName, postalCode);
    await customersListPage.assertNoAccountNumber(firstName, lastName);
  });
});