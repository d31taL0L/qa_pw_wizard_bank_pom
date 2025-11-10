import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.customerButton = page.getByRole('button', { name: 'Customers' });
    this.customerRows = page.locator('tbody tr');
    this.searchField = page.getByPlaceholder('Search Customer');
  }

  // Найти строку клиента по имени и фамилии
  getCustomerRow(firstName, lastName) {
    return this.customerRows.filter({ hasText: `${firstName} ${lastName}` });
  }

  // Получить ячейки для конкретного клиента
  getCustomerCells(firstName, lastName) {
    return this.getCustomerRow(firstName, lastName).getByRole('cell');
  }

  // Получить кнопку Delete для конкретного клиента
  getDeleteButton(firstName, lastName) {
    const cells = this.getCustomerCells(firstName, lastName);
    return cells.getByRole('button', { name: 'Delete' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async clickOnCustomerButton() {
    await this.customerButton.click();
  }

  // Проверка имени конкретного клиента
  async assertFirstName(firstName, lastName) {
    const cells = this.getCustomerCells(firstName, lastName);
    await expect(cells.nth(0)).toHaveText(firstName);
  }

  // Проверка фамилии конкретного клиента
  async assertLastName(firstName, lastName) {
    const cells = this.getCustomerCells(firstName, lastName);
    await expect(cells.nth(1)).toHaveText(lastName);
  }

  // Проверка почтового кода конкретного клиента
  async assertPostalCode(firstName, lastName, postalCode) {
    const cells = this.getCustomerCells(firstName, lastName);
    await expect(cells.nth(2)).toHaveText(postalCode);
  }

  // Проверка, что номера счета нет (скрыт)
  async assertNoAccountNumber(firstName, lastName) {
    const cells = this.getCustomerCells(firstName, lastName);
    await expect(cells.nth(3).locator('span')).toBeHidden();
  }

  // Проверка, что номер счета виден
  async assertAccountNumberIsVisible(firstName, lastName) {
    const cells = this.getCustomerCells(firstName, lastName);
    await expect(cells.nth(3).locator('span')).toBeVisible();
  }

  // Удалить конкретного клиента
  async clickOnDeleteButton(firstName, lastName) {
    const deleteButton = this.getDeleteButton(firstName, lastName);
    await deleteButton.click();
  }

  // Проверить, что клиент удален (его нет в таблице)
  async assertCustomerRowIsHidden(firstName, lastName) {
    const row = this.getCustomerRow(firstName, lastName);
    await expect(row).toHaveCount(0);
  }

  // Поиск по клиенту
  async fillSearchCustomerField(text) {
    await this.searchField.fill(text);
  }

  // Проверить наличие клиента
  async assertCustomerOnTheTable(infoOfTheCustomer) {
    const customerObject = this.customerRows.filter({ hasText: infoOfTheCustomer });
    await expect(customerObject).toBeVisible();
  }

  // Проверить, что только один клиент в таблице
  async assertOnlyOneCustomerRowOnPage() {
    await expect(this.customerRows).toHaveCount(1);
  }
}
