import Keychain from 'react-native-keychain';
import TokenType from './TokenType';

export default class TokenStorage {
  async putToken(type, token) {
    await Keychain.setGenericPassword(type, token ?? '', {service: type});
  }

  async getToken(type) {
    try {
      const credentials = await Keychain.getGenericPassword({service: type});
      if (credentials) {
        return credentials.password;
      }
    } catch (error) {
      console.log("Keychain couldn't be accessed!", error);
    }
    return null;
  }

  async clearToken(type) {
    await Keychain.resetGenericPassword({service: type});
  }

  async clearTokens() {
    Object.values(TokenType).forEach((type) => {
      this.clearToken(type);
    });
  }
}
