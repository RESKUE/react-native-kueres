import Subscribable from '../util/Subscribable';

export default class AuthService extends Subscribable {
  constructor(config) {
    super();
    this.config = config;
  }

  async login() {
    this.notify(true);
  }

  async logout() {
    this.notify(false);
  }

  async refresh() {
    this.notify(true);
  }

  async getAccessToken() {
    return null;
  }
}
