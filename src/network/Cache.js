import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Cache {
  async put(key, data) {
    const json = JSON.stringify(data);
    await AsyncStorage.setItem(key, json);
  }

  async get(key) {
    const json = await AsyncStorage.getItem(key);
    return json !== null ? JSON.parse(json) : null;
  }
}
