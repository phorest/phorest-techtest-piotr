import RESTSerializer from "@ember-data/serializer/rest";
import { pluralize } from "ember-inflector";
const { assign } = Object;

export default class ApplicationSerializer extends RESTSerializer {
  normalizeQueryResponse(store, primaryModelClass, payload, id, requestType) {
    let _payload = payload._embedded
      ? payload._embedded
      : this._createEmptyArrResponse(primaryModelClass.modelName);
    return super.normalizeQueryResponse(
      store,
      primaryModelClass,
      _payload,
      id,
      requestType
    );
  }

  normalizeCreateRecordResponse(
    store,
    primaryModelClass,
    payload,
    id,
    requestType
  ) {
    let withRootKey = { [primaryModelClass.modelName]: payload };
    return super.normalizeCreateRecordResponse(
      store,
      primaryModelClass,
      withRootKey,
      id,
      requestType
    );
  }

  extractId(modelClass, resourceHash) {
    let primaryKey = `${modelClass.modelName}Id`;
    return resourceHash[primaryKey];
  }

  serializeIntoHash(data, _, record, options) {
    assign(data, { ...this.serialize(record, options) });
  }

  _createEmptyArrResponse(modelName) {
    let property = pluralize(modelName);
    return { [property]: [] };
  }
}
