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
    // Генерируем данные внутри beforeEach
    firstName = faker.person.firstName();
    lastName = faker.person.lastName();
    postalCode = faker.location.zipCode();

    // Инициализируем Page Objects
    bankManagerPage = new BankManagerMainPage(page);
    addCustomerPage = new AddCustomerPage(page);
    customersListPage = new CustomersListPage(page);

    // Pre-conditions:
    await bankManagerPage.open();
    await bankManagerPage.choosePage('Add Customer');
    await addCustomerPage.fillFirstName(firstName);
    await addCustomerPage.fillLastName(lastName);
    await addCustomerPage.fillPostalCode(postalCode);
    await addCustomerPage.clickOnAddCustomerButton();
  });

  test('Assert manager can delete customer', async ({ page }) => {
    // Открыть страницу с клиентами
    await bankManagerPage.choosePage('Customers');
    
    // Удалить конкретного клиента
    await customersListPage.clickOnDeleteButton(firstName, lastName);
    
    // Перезагрузить страницу
    await page.reload();
    
    // Проверить, что клиент удален
    await customersListPage.assertCustomerRowIsHidden(firstName, lastName);
  });
});
