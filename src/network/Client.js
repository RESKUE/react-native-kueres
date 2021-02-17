import FetchPolicy from './FetchPolicy';
import DataSource from './DataSource';
import Subscribable from '../util/Subscribable';
import mergeObjects from '../util/mergeObjects';

export default class Client extends Subscribable {
  constructor(cache, defaultOptions) {
    super();
    this.cache = cache;
    this.defaultOptions = defaultOptions;
  }

  async request(url, options, policy) {
    const compiledOptions = this.compileOptions(options);
    var cacheData = null;
    var networkData = null;

    if (this.shouldYieldCache(policy)) {
      const [data, error] = await this.yieldCache(url, compiledOptions);
      if (data !== null || error !== null) {
        this.notify(data, error, DataSource.cache);
        cacheData = data;
      }
    }

    if (this.shouldYieldNetwork(policy, cacheData)) {
      const [data, error] = await this.yieldNetwork(url, compiledOptions);
      this.notify(data, error, DataSource.network);
      networkData = data;
    }

    if (this.shouldUpdateCache(policy, compiledOptions)) {
      await this.updateCache(url, compiledOptions, networkData);
    }
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
        throw new Error(response.statusText);
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
    const {method} = options || {};
    const safeMethods = [null, 'GET'];
    return policy !== FetchPolicy.noCache && safeMethods.includes(method);
  }

  getCacheKey(url, options) {
    const {method} = options || {};
    const prefix = method === null ? 'GET' : method;
    return `${prefix}+${url}`;
  }

  compileOptions(options) {
    const nullSafeDefaultOptions = this.defaultOptions || {};
    const nullSafeOptions = options || {};
    return mergeObjects(nullSafeDefaultOptions, nullSafeOptions);
  }
}
