import AsyncStorage from '@react-native-async-storage/async-storage';
import TokenType from './TokenType';

export default class TokenStorage {
  async putToken(type, token) {
    await AsyncStorage.setItem(type, token ?? '');
  }

  async getToken(type) {
    return await AsyncStorage.getItem(type);
  }

  async clearToken(type) {
    return await AsyncStorage.removeItem(type);
  }

  async clearTokens() {
    Object.values(TokenType).forEach((type) => {
      this.clearToken(type);
    });
  }
}
