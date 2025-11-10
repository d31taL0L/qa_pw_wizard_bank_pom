import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.customerButton = page.getByRole('button', { name: 'Customers' });
    this.customerRows = page.locator('tbody tr');
    this.searchField = page.getByPlaceholder('Search Customer');
  }

  getCustomerRow(firstName, lastName) {
    return this.customerRows.filter({ hasText: `${firstName} ${lastName}` });
  }

  getCustomerCells(firstName, lastName) {
    return this.getCustomerRow(firstName, lastName).getByRole('cell');
  }

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

  async assertFirstName(firstName, lastName) {
    const cells = this.getCustomerCells(firstName, lastName);
    await expect(cells.nth(0)).toHaveText(firstName);
  }

  async assertLastName(firstName, lastName) {
    const cells = this.getCustomerCells(firstName, lastName);
    await expect(cells.nth(1)).toHaveText(lastName);
  }

  async assertPostalCode(firstName, lastName, postalCode) {
    const cells = this.getCustomerCells(firstName, lastName);
    await expect(cells.nth(2)).toHaveText(postalCode);
  }

  async assertNoAccountNumber(firstName, lastName) {
    const cells = this.getCustomerCells(firstName, lastName);
    await expect(cells.nth(3).locator('span')).toBeHidden();
  }

  async assertAccountNumberIsVisible(firstName, lastName) {
    const cells = this.getCustomerCells(firstName, lastName);
    await expect(cells.nth(3).locator('span')).toBeVisible();
  }

  async clickOnDeleteButton(firstName, lastName) {
    const deleteButton = this.getDeleteButton(firstName, lastName);
    await deleteButton.click();
  }

  async assertCustomerRowIsHidden(firstName, lastName) {
    const row = this.getCustomerRow(firstName, lastName);
    await expect(row).toHaveCount(0);
  }

  async fillSearchCustomerField(text) {
    await this.searchField.fill(text);
  }

  async assertCustomerOnTheTable(infoOfTheCustomer) {
    const customerObject = this.customerRows.filter({ hasText: infoOfTheCustomer });
    await expect(customerObject).toBeVisible();
  }

  async assertOnlyOneCustomerRowOnPage() {
    await expect(this.customerRows).toHaveCount(1);
  }
}
