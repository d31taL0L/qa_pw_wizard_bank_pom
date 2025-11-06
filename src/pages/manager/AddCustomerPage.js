import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNamePlaceholder = page.getByPlaceholder('First Name');
    this.lastNamePlaceholder = page.getByPlaceholder('Last Name');
    this.postalCodePlaceholder = page.getByPlaceholder('Post Code');
    this.addCustomerButton = page.getByRole('form').getByRole('button', { name: 'Add Customer' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

  async fillFirstName(firstName) {
    await this.firstNamePlaceholder.fill(firstName);
  }

  async fillLastName(lastName){
    await this.lastNamePlaceholder.fill(lastName);
  }

  async fillPostalCode(postalCode) {
    await this.postalCodePlaceholder.fill(postalCode);
  }

  async clickOnAddCustomerButton() {
    await this.addCustomerButton.click();
  }
}
