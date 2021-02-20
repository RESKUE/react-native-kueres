import Subscribable from '../util/Subscribable';
import AuthClient from './AuthClient';
import jwt_decode from 'jwt-decode';

export default class AuthService extends Subscribable {
  constructor(config, tokenStorage) {
    super();
    this.config = config;
    this.storage = tokenStorage;
    this.client = new AuthClient(config);
  }

  async getAccessToken() {
    return await this.storage.getAccessToken();
  }

  async autoLogin() {
    const refreshToken = await this.storage.getRefreshToken();
    if (refreshToken === null) {
      return;
    }
    await this.refresh();
  }

  async login(username, password) {
    try {
      const result = await this.client.login(username, password);
      await this.storage.put(
        result.access_token ?? null,
        result.refresh_token ?? null,
        result.id_token ?? null,
      );
      this.notify(result);
    } catch (error) {
      console.log('Error during login:', error);
      this.notify(null);
    }
  }

  async refresh() {
    try {
      const refreshToken = await this.storage.getRefreshToken();
      const result = await this.client.refresh(refreshToken);
      await this.storage.put(
        result.access_token ?? null,
        result.refresh_token ?? null,
        result.id_token ?? null,
      );
      this.notify(result);
    } catch (error) {
      console.log('Error during refresh:', error);
    }
  }

  async logout() {
    try {
      const refreshToken = await this.storage.getRefreshToken();
      await this.client.logout(refreshToken);
      await this.storage.clear();
    } catch (error) {
      console.log('Error during logout:', error);
    }
    this.notify(null);
  }

  isExpired(token) {
    const now = Date.now().valueOf() / 1000;
    const expiry = this.getExpiryDate(token);
    return expiry === null || expiry < now;
  }

  getExpiryDate(token) {
    const decoded = this.decodeToken(token);
    if (decoded === null || typeof decoded.exp === 'undefined') {
      return null;
    }
    return decoded.exp;
  }

  decodeToken(token) {
    if (token === null) {
      return null;
    }
    return jwt_decode(token);
  }
}
