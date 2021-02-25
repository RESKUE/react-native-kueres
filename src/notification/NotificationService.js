import {AppRegistry, NativeModules} from 'react-native';
import AuthService from '../auth/AuthService';
import Client from '../network/Client';
import Cache from '../network/Cache';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {NotificationModule} = NativeModules;
const LAST_SHOWN_ID_KEY = 'kueres-latest-notification-id';

export default class NotificationService {
  static start() {
    NotificationModule.startService();
  }

  static stop() {
    NotificationModule.stopService();
  }

  static register(endpoint, authConfig, tokenStorage) {
    const service = new NotificationService(endpoint, authConfig, tokenStorage);
    async function wrapper() {
      service.task();
    }
    AppRegistry.registerHeadlessTask('NotificationEventTask', () => wrapper);
  }

  constructor(endpoint, authConfig, tokenStorage) {
    this.endpoint = endpoint;
    this.authConfig = authConfig;
    this.tokenStorage = tokenStorage;
    this.authService = new AuthService(authConfig, tokenStorage);
    this.networkClient = new Client(new Cache());
  }

  async task() {
    const accessToken = await this.getAccessToken();
    if (!accessToken) {
      // No valid access token could be obtained.
      // Thus fetching notifications is impossible.
      return;
    }
    const notifications = await this.fetchNotifications(accessToken);
    await this.showAndRemember(notifications);
  }

  async getAccessToken() {
    const accessToken = await this.authService.getAccessToken();
    if (this.authService.isExpired(accessToken)) {
      await this.authService.refresh();
      return await this.tokenStorage.getAccessToken();
    }
    return accessToken;
  }

  async fetchNotifications(accessToken) {
    const latestId = (await this.getLastShownId()) ?? 0;
    const url = `${this.endpoint}?filter=id>${latestId}&sort=sentAt;desc`;
    const options = {headers: {Authorization: `Bearer ${accessToken}`}};

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      return result?.content ?? [];
    } catch (error) {
      console.log('Error fetching notifications in background:', error);
      return [];
    }
  }

  async showAndRemember(notifications) {
    notifications.forEach(async (notification) => {
      const id = notification?.id ?? null;
      const title = notification?.title ?? '';
      const message = notification?.message ?? '';
      if (id !== null) {
        NotificationModule.showNotification(id, title, message);
        await this.setLastShownId(id);
      }
    });
  }

  async getLastShownId() {
    const raw = await AsyncStorage.getItem(LAST_SHOWN_ID_KEY);
    return JSON.parse(raw);
  }

  async setLastShownId(id) {
    const json = JSON.stringify(id);
    await AsyncStorage.setItem(LAST_SHOWN_ID_KEY, json);
  }
}
