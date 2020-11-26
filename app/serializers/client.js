import ApplicationSerializer from './application';

export default class ClientSerializer extends ApplicationSerializer {
  attrs = {
    phone: "mobile"
  }
}
