import FetchPolicy from './FetchPolicy';
import DataSource from './DataSource';
import Subscribable from '../util/Subscribable';

export default class Client extends Subscribable {
  constructor(cache, defaultHeaders) {
    super();
    this.cache = cache;
    this.defaultHeaders = defaultHeaders;
  }

  async request(url, options, policy) {
    const preparedOptions = this.prepareOptions(options);
    var cacheData = null;
    var cacheError = null;
    var networkData = null;
    var networkError = null;

    if (this.shouldYieldCache(policy)) {
      const [data, error] = await this.yieldCache(url, preparedOptions);
      if (data !== null || error !== null) {
        this.notify({data, error, source: DataSource.cache});
        cacheData = data;
        cacheError = error;
      }
    }

    if (this.shouldYieldNetwork(policy, cacheData)) {
      const [data, error] = await this.yieldNetwork(url, preparedOptions);
      this.notify({data, error, source: DataSource.network});
      networkData = data;
      networkError = error;
    }

    if (this.shouldUpdateCache(policy, preparedOptions)) {
      await this.updateCache(url, preparedOptions, networkData);
    }

    if (networkData || networkError) {
      return {
        data: networkData,
        error: networkError,
        source: DataSource.network,
      };
    }

    if (cacheData || cacheError) {
      return {
        data: cacheData,
        error: cacheError,
        source: DataSource.cache,
      };
    }

    return null;
  }

  async yieldCache(url, options) {
    try {
      const cacheKey = this.getCacheKey(url, options);
      const data = await this.cache.get(cacheKey);
      return [data, null];
    } catch (error) {
      return [null, error];
    }
  }

  async yieldNetwork(url, options) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const status = response.status;
        throw new Error(`Received unsuccessful response! Status: ${status}`);
      }
      const data = await response.json();
      return [data, null];
    } catch (error) {
      return [null, error];
    }
  }

  async updateCache(url, options, data) {
    const cacheKey = this.getCacheKey(url, options);
    await this.cache.put(cacheKey, data);
  }

  shouldYieldCache(policy) {
    const relevant = [
      FetchPolicy.cacheOnly,
      FetchPolicy.cacheFirst,
      FetchPolicy.cacheAndNetwork,
    ];
    return relevant.includes(policy);
  }

  shouldYieldNetwork(policy, cacheData) {
    if (policy === FetchPolicy.cacheFirst) {
      return cacheData === null;
    }
    return policy !== FetchPolicy.cacheOnly;
  }

  shouldUpdateCache(policy, options) {
    const {method} = options;
    const safeMethods = [null, undefined, 'GET'];
    return policy !== FetchPolicy.noCache && safeMethods.includes(method);
  }

  getCacheKey(url, options) {
    const {method} = options;
    const prefix = method === null ? 'GET' : method;
    return `${prefix}+${url}`;
  }

  prepareOptions(options) {
    const nullSafeHeaders = options?.headers ?? {};
    const mergedHeaders = {...this.defaultHeaders, ...nullSafeHeaders};
    const preparedOptions = {...options};
    if (this.defaultHeaders || options?.headers) {
      preparedOptions.headers = mergedHeaders;
    }
    return preparedOptions;
  }
}
