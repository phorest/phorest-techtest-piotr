import Model, { attr } from "@ember-data/model";

export default class VoucherModel extends Model {
  @attr("string")
  clientId;

  @attr("string")
  creatingBranchId;

  @attr("date")
  expiryDate;

  @attr("date")
  issueDate;

  @attr("number")
  originalBalance;
}
