import Subscribable from '../util/Subscribable';
import {authorize, refresh, revoke} from 'react-native-app-auth';
import jwt_decode from 'jwt-decode';

export default class AuthService extends Subscribable {
  constructor(config, tokenStorage) {
    super();
    this.config = config;
    this.storage = tokenStorage;
  }

  async getIdToken() {
    return await this.storage.getIdToken();
  }

  async autoLogin() {
    const refreshToken = await this.storage.getRefreshToken();
    if (refreshToken === null) {
      return;
    }
    await this.refresh();
  }

  async login() {
    try {
      const result = await authorize(this.config);
      await this.storage.put(
        result.accessToken,
        result.refreshToken,
        result.idToken,
      );
      this.notify(result);
    } catch (error) {
      console.log(error);
      this.notify(null);
    }
  }

  async refresh() {
    try {
      const refreshToken = await this.storage.getRefreshToken();
      const result = await refresh(this.config, {
        refreshToken: refreshToken,
      });
      await this.storage.put(
        result.accessToken,
        result.refreshToken,
        result.idToken,
      );
      this.notify(result);
    } catch (error) {
      console.log(error);
    }
  }

  async logout() {
    await this.revokeRefreshToken();
    await this.revokeAccessToken();
    await this.revokeIdToken();
    this.notify(null);
  }

  async revoke(token) {
    await revoke(this.config, {
      tokenToRevoke: token,
      includeBasicAuth: true,
      sendClientId: true,
    });
  }

  async revokeAccessToken() {
    try {
      await this.revoke(await this.storage.getAccessToken());
      await this.storage.clearAccessToken();
    } catch (error) {
      console.log(error);
    }
  }

  async revokeRefreshToken() {
    try {
      await this.revoke(await this.storage.getRefreshToken());
      await this.storage.clearRefreshToken();
    } catch (error) {
      console.log(error);
    }
  }

  async revokeIdToken() {
    try {
      await this.revoke(await this.storage.getIdToken());
      await this.storage.clearIdToken();
    } catch (error) {
      console.log(error);
    }
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
