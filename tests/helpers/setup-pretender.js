import Pretender from "pretender";
import ENV from "phorest-techtest-piotr/config/environment";

let url = `${ENV.api.host}/${ENV.api.namespace}/${ENV.api.businessId}`;

const createHandler = function(method, { status, payload }) {
  return function() {
    this[method](`${url}/client`, () => {
      return [
        status,
        { "Content-Type": "application/json" },
        JSON.stringify(payload)
      ];
    });
  };
};

export const setupPretender = function(hooks) {
  hooks.beforeEach(function() {
    this.server = new Pretender();
  });

  hooks.afterEach(function() {
    this.server.shutdown();
  });
};

export const postClient = function() {
  return createHandler("post", ...arguments);
};

export const getClient = function() {
  return createHandler("get", ...arguments);
};
