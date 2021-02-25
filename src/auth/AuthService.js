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
      await this.storeResult(result);
      this.notify(result);
      return true;
    } catch (error) {
      console.log('Error during login:', error);
      this.notify(null);
      return false;
    }
  }

  async refresh() {
    try {
      const refreshToken = await this.storage.getRefreshToken();
      const result = await this.client.refresh(refreshToken);
      await this.storeResult(result);
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

  async storeResult(result) {
    await this.storage.put(
      result.accessToken ?? null,
      result.refreshToken ?? null,
      result.idToken ?? null,
    );
  }

  notify(result) {
    const accessToken = result?.accessToken ?? null;
    const clientRoles = this.extractClientRoles(accessToken);
    const loginStatus = !!accessToken;
    super.notify(loginStatus, accessToken, clientRoles);
  }

  extractClientRoles(accessToken) {
    const tokenData = this.decodeToken(accessToken);
    const resourceAccess = tokenData?.resource_access ?? {};
    const client = resourceAccess[this.config.clientId] ?? {};
    return client.roles ?? [];
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
