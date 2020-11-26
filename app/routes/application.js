import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service basicAuth

  beforeModel() {
    let transition = this.basicAuth.hasCredentials ? "clients" : "login";
    this.transitionTo(transition);
  }
}
