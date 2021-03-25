import {AppRegistry, NativeModules} from 'react-native';
import AuthService from '../auth/AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Client from '../network/Client';
import FetchPolicy from '../network/FetchPolicy';

const {NotificationModule} = NativeModules;
const LAST_SHOWN_ID_KEY = 'kueres-latest-notification-id';

export default class NotificationService {
  static stop() {
    NotificationModule.stopService();
  }

  static start() {
    NotificationModule.startService();
  }

  static setup({baseUrl, authConfig, tokenStorage}) {
    const service = new NotificationService({
      baseUrl,
      authConfig,
      tokenStorage,
    });
    async function wrapper() {
      service.task();
    }
    AppRegistry.registerHeadlessTask('NotificationEventTask', () => wrapper);
  }

  constructor({baseUrl, authConfig, tokenStorage}) {
    this.baseUrl = baseUrl;
    this.authConfig = authConfig;
    this.authService = new AuthService(authConfig, tokenStorage);
  }

  async task() {
    const accessToken = await this.getAccessToken();
    if (!accessToken) {
      // No valid access token could be obtained.
      // Thus fetching notifications is impossible.
      return;
    }
    const lastShownId = (await this.getLastShownId()) ?? 0;
    const myUserGroupIds = await this.fetchMyUserGroupIds(accessToken);
    if (!myUserGroupIds) {
      // Either unable to fetch groups or the user has none.
      return;
    }
    const notifications = await this.fetchNotifications(
      accessToken,
      myUserGroupIds,
      lastShownId,
    );
    if (!notifications) {
      // Either unable to fetch notificatiosn or there are none.
      return;
    }
    await this.showAndRemember(notifications);
  }

  async getAccessToken() {
    const accessToken = await this.authService.getAccessToken();
    if (accessToken && this.authService.isExpired(accessToken)) {
      await this.authService.refresh();
      return await this.authService.getAccessToken();
    }
    return accessToken;
  }

  async fetchMyUserGroupIds(accessToken) {
    const client = new Client();
    const options = {headers: {Authorization: `Bearer ${accessToken}`}};
    const url = `${this.baseUrl}/user/me`;

    const result = await client.request(url, options, FetchPolicy.networkOnly);

    if (result.error) {
      console.log('Fetching user groups in background failed:', result);
      return null;
    }
    return result.data?.userGroups ?? [];
  }

  async fetchNotifications(accessToken, userGroupIds, lastShownId) {
    const client = new Client();
    const options = {headers: {Authorization: `Bearer ${accessToken}`}};
    const joinedUserGroupIds = userGroupIds.join(',');

    const query = new URLSearchParams();
    query.append('ids', joinedUserGroupIds);
    query.append('filter', `id>${lastShownId}`);
    query.append('sort', 'sentAt;desc');
    const url = `${this.baseUrl}/userGroup/notifications?${query}`;

    const result = await client.request(url, options, FetchPolicy.networkOnly);

    if (result.error) {
      console.log('Fetching notifications in background failed:', result);
      return null;
    }
    return result.data?.content ?? [];
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
