import Model, { attr } from '@ember-data/model';

export default class ClientModel extends Model {
  @attr("string")
  firstName

  @attr("string")
  lastName

  @attr("string")
  email

  @attr("string")
  phone
}
