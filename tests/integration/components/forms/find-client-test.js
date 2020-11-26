import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import FindClientForm from "phorest-techtest-piotr/tests/pages/components/forms/find-client";

module('Integration | Component | forms/find-client', function(hooks) {
  setupRenderingTest(hooks);

  module("when form is invalid", function() {
    test("it shows error message", async function(assert) {
      assert.expect(2);
      let invalidEmail = "qwe";
      await render(hbs`<Forms::FindClient />`);
      assert.notOk(FindClientForm.errorMessageIsVisible, "is invisible")
      await FindClientForm.findByEmail(invalidEmail);
      assert.ok(FindClientForm.errorMessageIsVisible, "is visible")
    });
  });
});
