import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.customerLocator = page.getByTestId('userSelect');
    this.currencyLocator = page.getByTestId('currency');
    this.processButton = page.getByRole('button', { name: 'Process' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async selectCustomer({ firstName, lastName }) {
    await this.customerLocator.selectOption({ label: `${firstName} ${lastName}`});
  }

  async selectCurrency(currency) {
    await this.currencyLocator.selectOption(currency);
  }

  async clickOnProcessButton() {
    await this.processButton.click();
  }

  async assertSelectedCurrency(currency) {
    await expect(this.currencyLocator).toHaveValue(currency);
  }
}
