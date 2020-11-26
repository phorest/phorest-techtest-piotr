import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import {
  find,
  render,
  settled
} from '@ember/test-helpers';
import { hbs } from "ember-cli-htmlbars";
import sinon from "sinon";

module("Integration | Component | providers/clients", function(hooks) {
  setupRenderingTest(hooks);

  module("when executes 'fetchClients'", function() {
    test("it throttles frequent clicks", async function(assert) {
      assert.expect(1);
      let store = this.owner.lookup("service:store");
      let stub = sinon.stub(store, "query");
      await render(hbs`
        <Providers::Clients as |provider|>
          <button type="button" {{on "click" provider.fetchClients}}>click</button>
        </Providers::Clients>
      `);

      let button = find("button");
      button.click();
      button.click();
      await settled();
      assert.ok(stub.calledOnce, "throttles frequent clicks");
    });
  });
});
