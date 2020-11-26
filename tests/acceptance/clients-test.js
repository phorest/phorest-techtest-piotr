import { module, test } from "qunit";
import { currentURL, findAll, settled } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";
import LoginPage from "phorest-techtest-piotr/tests/pages/login";
import FindClientForm from "phorest-techtest-piotr/tests/pages/components/forms/find-client";
import {
  setupPretender,
  getClient
} from "phorest-techtest-piotr/tests/helpers/setup-pretender";

module("Acceptance | clients", function(hooks) {
  setupApplicationTest(hooks);
  setupPretender(hooks);

  module("#query clients", function() {
    module("when response is 401", function(hooks) {
      hooks.beforeEach(function() {
        this.server.map(getClient({ status: 401 }));
      });

      test("it redirects to /login page", async function(assert) {
        assert.expect(1);
        await LoginPage.visitAndSignIn();
        await FindClientForm.findByEmail("qwe@qwe.de");
        await settled();
        assert.equal(currentURL(), "/login");
      });
    });

    module("when respond with clients", function(hooks) {
      hooks.beforeEach(function() {
        let payload = {
          _embedded: {
            clients: [
              { clientId: "1", firstName: "Peter" },
              { clientId: "2", firstName: "Zoe" }
            ]
          }
        };
        this.server.map(getClient({ status: 200, payload }));
      });

      test("it shows them", async function(assert) {
        assert.expect(1);
        await LoginPage.visitAndSignIn();
        await FindClientForm.findByEmail("qwe@qwe.de");
        await settled();
        let clients = findAll("[data-test-client-row]");
        assert.equal(clients.length, 2, "shows 2 clients");
      });
    });
  });
});
