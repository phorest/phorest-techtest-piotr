import RESTAdapter from "@ember-data/adapter/rest";
import { inject as service } from "@ember/service";
import ENV from 'phorest-techtest-piotr/config/environment';

export default class ApplicationAdapter extends RESTAdapter {
  @service basicAuth;
  @service router;
  host = ENV.api.host;
  namespace = `${ENV.api.namespace}/${ENV.api.businessId}`;

  get headers() {
    return {
      Authorization: `Basic ${this.basicAuth.encodeBase64Credentials()}`
    };
  }

  pathForType(modelName) {
    return modelName;
  }

  handleResponse(status, headers, payload, requestData) {
    if (status === 401) {
      this.router.transitionTo("login");
    }
    return super.handleResponse(...arguments);
  }
}
