import { expect, test } from '@playwright/test';
import AppPage from './AppPage';
import { fakeUser } from './testdata/fakeUser';
import { fakeUserWithInvalidEmail } from './testdata/fakeUserWithInvalidEmail';

test.describe('User registration', () => {
  test('it registers a user when a correctly filled form is submitted', async ({ page }) => {
    // GIVEN
    const appPage = await new AppPage(page).goto();

    // WHEN
    await appPage.enterUserInfoToRegistrationForm(fakeUser);
    await appPage.registerButton.click();

    // THEN
    await expect(appPage.registeredUserListItem).toHaveText(Object.values(fakeUser).join(', '));
  });

  test('it does not register a user, but shows errors, when an empty form is submitted', async ({
    page
  }) => {
    // GIVEN
    const appPage = await new AppPage(page).goto();

    // WHEN
    await appPage.registerButton.click();

    // THEN
    await appPage.expectUserRegistrationFormToShowErrors();
    await expect(appPage.registeredUserListItem).toBeHidden();
  });

  test('it does not register user, but shows an error, when an invalid email supplied in the submitted form', async ({
    page
  }) => {
    // GIVEN
    const appPage = await new AppPage(page, true).goto();

    // WHEN
    await appPage.enterUserInfoToRegistrationForm(fakeUserWithInvalidEmail);
    await appPage.registerButton.click();

    // THEN
    await expect(appPage.getInvalidEmailErrorMsg()).toBeVisible();
    await expect(appPage.registeredUserListItem).toBeHidden();
  });

  test('it does not register a user when registration fails', async ({ page }) => {
    // GIVEN
    const appPage = await new AppPage(page, true).goto();

    // WHEN
    await appPage.enterUserInfoToRegistrationForm(fakeUser);
    await appPage.registerButton.click();

    // THEN
    await expect(appPage.getRegistrationErrorMsg()).toBeVisible();
    await expect(appPage.registeredUserListItem).toBeHidden();
  });
});
