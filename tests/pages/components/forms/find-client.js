import { click, fillIn, find } from "@ember/test-helpers";

const selectors = {
  emailRadio: "[data-test-email-radio]",
  searchInput: "[data-test-search-input]",
  errorMsg: "[data-test-error-msg]"
};

export default {
  async findByEmail(email) {
    await click(selectors.emailRadio);
    await fillIn(selectors.searchInput, email);
  },

  get errorMessageIsVisible() {
    return !!find(selectors.errorMsg);
  }
};
