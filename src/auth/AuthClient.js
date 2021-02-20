export default class AuthClient {
  constructor(config) {
    this.config = config;
  }

  async login(username, password) {
    const params = {
      grant_type: 'password',
      username: username,
      password: password,
    };
    return await this.request(this.config.tokenEndpoint, params);
  }

  async refresh(refreshToken) {
    const params = {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    };
    return await this.request(this.config.tokenEndpoint, params);
  }

  async logout(refreshToken) {
    const params = {refresh_token: refreshToken};
    return await this.request(this.config.endSessionEndpoint, params);
  }

  async request(endpoint, extraParams) {
    const params = this.compileParams(extraParams);
    const options = this.compileRequestOptions(params);
    const response = await fetch(endpoint, options);
    if (!response.ok) {
      const msg = `AuthClient Response not ok. (status code ${response.status})`;
      throw new Error(msg);
    }
    const data = await response.text();
    try {
      return JSON.parse(data);
    } catch (error) {}
    return data;
  }

  compileRequestOptions(params) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    };
  }

  compileParams(params) {
    const defaultParams = this.getDefaultParams();
    return new URLSearchParams({...defaultParams, ...params});
  }

  getDefaultParams() {
    return {
      client_id: this.config.clientId,
      scope: this.config.scope,
    };
  }
}
