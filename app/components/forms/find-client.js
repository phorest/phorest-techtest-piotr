import Component from "@glimmer/component";
import { action } from "@ember/object";
import Joi from "joi";
import { tracked } from "@glimmer/tracking";

const onlyDigitsRegEx = /^\d+$/;

export default class FormsFindClientComponent extends Component {
  @tracked
  findBy = "";

  @tracked
  showError = false;

  @action
  onChangeInput(event) {
    let value = event.target.value;
    let result = this._validateInput(value);
    this.showError = result.error ? true : false;
    if (!result.error) this.args.onValidInput({ findBy: this.findBy, value: result.value });
  }

  get type() {
    return this.findBy === "email" ? "email" : "string";
  }

  _validateInput(value) {
    let result;
    if (this.findBy === "email") {
      result = Joi.string()
        .email({ tlds: { allow: false } })
        .validate(value);
    } else {
      result = Joi.string()
        .pattern(onlyDigitsRegEx)
        .min(3)
        .validate(value);
    }
    return result;
  } //TODO not sure about validations... it wasn't specified in description of task - probably needs correction according requirments
}
