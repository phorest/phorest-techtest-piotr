import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class BasicAuthService extends Service {
  @tracked
  login = "";

  @tracked
  password = "";

  get hasCredentials() {
    return !!(this.login && this.password);
  }

  encodeBase64Credentials() {
    return btoa(`${this.login}:${this.password}`);
  }

  cacheCredentials(login, password) {
    this.login = login;
    this.password = password;
  }
}
