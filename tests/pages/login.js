import {
  click,
  fillIn,
  visit
} from '@ember/test-helpers';

const selectors = {
  loginInput: "[data-test-login-input]",
  passwordInput: "[data-test-password-input]",
  button: "[data-test-sign-in-button]"
}

export default {
  async visit() {
    await visit("/login");
  },

  async fillLogin(login) {
    await fillIn(selectors.loginInput, login);
  },

  async fillPassword(password) {
    await fillIn(selectors.passwordInput, password);
  },

  async signIn() {
    await this.fillLogin("valid");
    await this.fillPassword("secret");
    await this.clickLogin();
  },

  async clickLogin() {
    await click(selectors.button);
  },

  async visitAndSignIn() {
    await this.visit();
    await this.signIn();
  }
}
