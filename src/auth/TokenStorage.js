import AsyncStorage from '@react-native-async-storage/async-storage';

export default class TokenStorage {
  async put(accessToken, refreshToken, idToken) {
    await this.putAccessToken(accessToken);
    await this.putRefreshToken(refreshToken);
    await this.putIdToken(idToken);
  }

  async get() {
    return {
      accessToken: await this.getAccessToken(),
      refreshToken: await this.getRefreshToken(),
      idToken: await this.getIdToken(),
    };
  }

  async clear() {
    await this.clearAccessToken();
    await this.clearRefreshToken();
    await this.clearIdToken();
  }

  async putAccessToken(accessToken) {
    const accessTokenKey = this.getAccessTokenKey();
    await AsyncStorage.setItem(accessTokenKey, accessToken);
  }

  async putRefreshToken(refreshToken) {
    const refreshTokenKey = this.getRefreshTokenKey();
    await AsyncStorage.setItem(refreshTokenKey, refreshToken);
  }

  async putIdToken(idToken) {
    const idTokenKey = this.getIdTokenKey();
    await AsyncStorage.setItem(idTokenKey, idToken);
  }

  async getAccessToken() {
    const accessTokenKey = this.getAccessTokenKey();
    return await AsyncStorage.getItem(accessTokenKey);
  }

  async getRefreshToken() {
    const refreshTokenKey = this.getRefreshTokenKey();
    return await AsyncStorage.getItem(refreshTokenKey);
  }

  async getIdToken() {
    const idTokenKey = this.getIdTokenKey();
    return await AsyncStorage.getItem(idTokenKey);
  }

  async clearAccessToken() {
    const accessTokenKey = this.getAccessTokenKey();
    return await AsyncStorage.removeItem(accessTokenKey);
  }

  async clearRefreshToken() {
    const refreshTokenKey = this.getRefreshTokenKey();
    return await AsyncStorage.removeItem(refreshTokenKey);
  }

  async clearIdToken() {
    const idTokenKey = this.getIdTokenKey();
    return await AsyncStorage.removeItem(idTokenKey);
  }

  getAccessTokenKey() {
    return 'kueres-access-token';
  }

  getRefreshTokenKey() {
    return 'kueres-refresh-token';
  }

  getIdTokenKey() {
    return 'kueres-id-token';
  }
}
