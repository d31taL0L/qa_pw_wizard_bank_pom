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
    // Генерируем данные внутри beforeEach
    firstName = faker.person.firstName();
    lastName = faker.person.lastName();
    postalCode = faker.location.zipCode();

    // Инициализируем Page Objects
    bankManagerPage = new BankManagerMainPage(page);
    addCustomerPage = new AddCustomerPage(page);
    openAccountPage = new OpenAccountPage(page);
    customersListPage = new CustomersListPage(page);

    // Pre-conditions:
    await bankManagerPage.open();
    await bankManagerPage.choosePage('Add Customer');
    await addCustomerPage.fillFirstName(firstName);
    await addCustomerPage.fillLastName(lastName);
    await addCustomerPage.fillPostalCode(postalCode);
    await addCustomerPage.clickOnAddCustomerButton();
  });

  test('Assert manager can open account for customer', async ({ page }) => {
    // Открыть страницу открытия счета
    await bankManagerPage.choosePage('Open Account');
    
    // Выбрать клиента
    await openAccountPage.selectCustomer({firstName, lastName});
    
    // Выбрать валюту
    await openAccountPage.selectCurrency('Dollar');
    
    // Нажать Process
    await openAccountPage.clickOnProcessButton();
    
    // Перезагрузить страницу
    await page.reload();
    
    // Перейти на страницу клиентов
    await bankManagerPage.choosePage('Customers');
    
    // Проверить, что номер счета видимый для конкретного клиента
    await customersListPage.assertAccountNumberIsVisible(firstName, lastName);
  });
});
