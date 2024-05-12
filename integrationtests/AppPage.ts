import { Locator, Page, expect } from '@playwright/test';
import { User } from './testdata/User';
import { fakeUser } from './testdata/fakeUser';
import { camelCaseIdentifierToWords } from './utils/camelCaseIdentifierToWords';
import forEachAsync from './utils/forEachAsync';

export default class AppPage {
  readonly inputs: Record<keyof User, Locator>;
  readonly registerButton: Locator;
  readonly registeredUserListItem: Locator;

  constructor(
    private readonly page: Page,
    private readonly registrationShouldFail = false
  ) {
    this.page = page;

    this.inputs = Object.keys(fakeUser).reduce(
      (inputs, fieldName) => ({
        ...inputs,
        [fieldName]: page.getByLabel(camelCaseIdentifierToWords(fieldName))
      }),
      {} as Record<keyof User, Locator>
    );

    this.registerButton = page.getByRole('button', {
      name: /Register/i
    });

    this.registeredUserListItem = page.getByRole('listitem');
  }

  async goto() {
    await this.page.goto(
      `http://localhost:3000?test=true${this.registrationShouldFail ? '&fail=true' : ''}`
    );
    return this;
  }

  async enterUserInfoToRegistrationForm(user: User) {
    await forEachAsync(Object.entries(user), async ([fieldName, value]) => {
      await this.inputs[fieldName as keyof User].fill(value);
    });
  }

  async expectUserRegistrationFormToShowErrors() {
    await forEachAsync(Object.keys(this.inputs), async (fieldName) => {
      const inputErrorMsgPrefix = camelCaseIdentifierToWords(fieldName);
      let errorText;

      if (fieldName === 'email') {
        errorText = this.page.getByText(`${inputErrorMsgPrefix} must be a valid email address`);
      } else {
        errorText = this.page.getByText(`${inputErrorMsgPrefix} is required`);
      }

      await expect(errorText).toBeVisible();
    });
  }

  getRegistrationErrorMsg() {
    return this.page.getByText(/Registration failed/i);
  }

  getInvalidEmailErrorMsg() {
    return this.page.getByText(/Email must be a valid email address/i);
  }
}
