import { expect } from '@playwright/test';

export class BankManagerMainPage {
  constructor(page) {
    this.page = page;
    this.addCustomerButton = page.getByRole('button', { name: 'Add Customer' });
    this.openAccountButton = page.getByRole('button', { name: 'Open Account' });
    this.customersButton = page.getByRole('button', { name: 'Customers' })
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager');
  }

  async choosePage(nameOfPage) {
    if (nameOfPage === 'Add Customer') {
      await this.addCustomerButton.click();
    } else if (nameOfPage === 'Open Account') {
      await this.openAccountButton.click();
    } else if (nameOfPage === 'Customers'){
      await this.customersButton.click();
    } else {
      throw new Error(`choosePage expecting: 'Add Customer' or 'Open Account' or 'Customers', received: ${nameOfPage}`);
    }
  }

  async assertButtonOnMainPage(nameOfButton) {
    if (nameOfButton === 'Add Customer') {
      await expect(this.addCustomerButton).toBeVisible();
    } else if (nameOfButton === 'Open Account') {
      await expect(this.openAccountButton).toBeVisible();
    } else if (nameOfButton === 'Customers'){
      await expect(this.customersButton).toBeVisible();
    } else {
      throw new Error(`assertButtonOnMainPage expecting: 'Add Customer' or 'Open Account' or 'Customers', received: ${nameOfButton}`);
    }
  }
}
