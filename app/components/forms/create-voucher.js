import Component from "@glimmer/component";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import moment from "moment";
import VoucherValidation from "phorest-techtest-piotr/validations/voucher";
import { tracked } from "@glimmer/tracking";
import { task } from "ember-concurrency";
import ENV from "phorest-techtest-piotr/config/environment";

export default class FormsCreateVoucherComponent extends Component {
  @service store;

  expiryDateOptions = [
    { label: "fortnight", argsToMomentFn: [2, "weeks"] },
    { label: "1 month", argsToMomentFn: [1, "months"] },
    { label: "2 months", argsToMomentFn: [2, "months"] }
  ];
  expiryDate;
  balance = 0;
  @tracked showError = false;

  @action
  createVoucherForClient(client) {
    let result = this._validateInput(client);
    this.showError = !result.isValid;
    if (result.isValid) {
      this.createNewVoucher.perform(result.value);
    }
  }

  @task(function*(validatedInput) {
    return yield this.store.createRecord("voucher", validatedInput).save();
  })
  createNewVoucher;

  _getExpiryDate() {
    if (this.expiryDate) {
      return moment()
        .add(...this.expiryDate.argsToMomentFn)
        .toDate();
    }
  }

  _validateInput(client) {
    let voucher = {
      clientId: client.id,
      creatingBranchId: ENV.api.branchId,
      originalBalance: this.balance,
      issueDate: moment().toDate(),
      expiryDate: this._getExpiryDate()
    };
    let result = VoucherValidation.validate(voucher);
    result.isValid = result.error ? false : true;
    return result;
  }
}
