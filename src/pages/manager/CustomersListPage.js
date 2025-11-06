import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.customerButton = page.getByRole('button', { name: 'Customers' });
    this.customerRows = page.locator('tbody tr');
    this.lastRow = this.customerRows.last();
    this.lastRowCells = this.lastRow.getByRole('cell');
    this.deleteButton = this.lastRowCells.getByRole('button', { name: 'Delete' });
    this.searchField = page.getByPlaceholder('Search Customer');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async clickOnCustomerButton(){
    await this.customerButton.click();
  }

  async assertFirstName(firstName){
    await expect(this.lastRowCells.nth(0)).toHaveText(firstName);
  }

  async assertLastName(lastName){
    await expect(this.lastRowCells.nth(1)).toHaveText(lastName);
  }

  async assertPostalCode(postalCode){
    await expect(this.lastRowCells.nth(2)).toHaveText(postalCode);
  }

  async assertNoAccountNumber(){
    await expect(this.lastRowCells.nth(3).locator('span')).toBeHidden();
  }

  async assertAccountNumberIsVisible(){
    await expect(this.lastRowCells.nth(3).locator('span')).toBeVisible();
  }

  async clickOnDeleteButton() {
    await this.deleteButton.click();
  }

  async assertCustomerRowIsHidden(firstName) {
    await expect(this.lastRowCells.nth(0)).not.toHaveText(firstName);
  }

  async fillSearchCustomerField(text) {
    await this.searchField.fill(text);
  }

  async assertCustomerOnTheTable(infoOfTheCustomer) {
    const customerObject = await this.customerRows.filter({ hasText: infoOfTheCustomer });
    await expect(customerObject).toBeVisible();
  }

  async assertOnlyOneCustomerRowOnPage() {
    await expect(this.customerRows).toHaveCount(1);
  }
}
