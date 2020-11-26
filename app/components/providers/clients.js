import Component from "@glimmer/component";
import { task, timeout } from "ember-concurrency";
import { inject as service } from "@ember/service";
import timeoutForEnv from "phorest-techtest-piotr/utils/timeout-for-env";

const DEBOUNCE_MS = 400;
export default class ProvidersClientsComponent extends Component {
  @service store;

  @(task(function*({ findBy, value }) {
    yield timeout(timeoutForEnv(DEBOUNCE_MS));
    try {
      return yield this.store.query("client", { [findBy]: value });
    } catch(e) {
      //TODO report to e.g. sentry
    }
  }).restartable())
  fetchClients;
}
