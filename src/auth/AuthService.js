export default class AuthService {
  constructor(config) {
    this.config = config;
    this.subscribers = [];
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

  onStatusChanged(callback) {
    this.subscribers.push(callback);
    return () => this.unsubscribe(callback);
  }

  unsubscribe(callback) {
    this.subscribers = this.subscribers.filter((item) => item !== callback);
  }

  notify(state) {
    this.subscribers.forEach((callback) => callback(state));
  }
}
