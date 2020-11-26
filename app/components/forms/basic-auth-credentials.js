import Component from "@glimmer/component";
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class FormsBasicAuthCredentialsComponent extends Component {
  @service basicAuth;
  @service router;

  @action
  signIn(login, password) {
    this.basicAuth.cacheCredentials(login, password);
    if (this.basicAuth.hasCredentials) this.router.transitionTo("clients");
  }
}
