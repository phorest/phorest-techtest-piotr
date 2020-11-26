import { module, test } from "qunit";
import { setupTest } from "ember-qunit";
import {
  setupPretender,
  postClient
} from "phorest-techtest-piotr/tests/helpers/setup-pretender";

module("Unit | Serializer | application", function(hooks) {
  setupTest(hooks);
  setupPretender(hooks);

  let serializer, store, payload = { clientId: "1" };
  hooks.beforeEach(function() {
    this.server.map(postClient({ status: 200, payload }));
    store = this.owner.lookup("service:store");
    serializer = store.serializerFor("application");
  });

  test("it exists", function(assert) {
    assert.ok(serializer);
  });

  module("when serialize", function() {
    test("it does not add root key", async function(assert) {
      assert.expect(1);
      let store = this.owner.lookup("service:store");
      let expectedPayload = {
        email: "qwe@qwe.de",
        mobile: null,
        firstName: "Hans",
        lastName: "Landa"
      };
      let record = store.createRecord("client", expectedPayload);
      await record.save();
      let [firstRequest] = this.server.handledRequests;
      let serialized = JSON.parse(firstRequest.requestBody);
      assert.deepEqual(serialized, expectedPayload, "are equal");
    });
  });

  module("when normalize", function() {
    test("it extracts id according to schema: 'modelName'+Id", async function(assert) {
      assert.expect(1);
      let normalized = store.normalize("client", { clientId: "123" });
      assert.equal(normalized.data.id, "123", "id comes from clientId");
    });

    module("created record", function() {
      test("it adds root key", async function(assert) {
        assert.expect(1);
        let client = await store.createRecord("client", {}).save();
        assert.equal(client.id, payload.clientId);
      });
    });
  });
});
