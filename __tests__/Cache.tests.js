import AsyncStorage from '@react-native-async-storage/async-storage';
import Cache from '../src/network/Cache';

test('put delegates json stringified to asyncstorage', async () => {
  const cache = new Cache();
  await cache.put('some-key', 42);
  expect(AsyncStorage.setItem).toBeCalledWith('some-key', '42');
});

test('get deserializes json values from asyncstorage', async () => {
  AsyncStorage.getItem = jest.fn().mockResolvedValue('{"key": "value"}');
  const cache = new Cache();
  const value = await cache.get('some-key');
  expect(AsyncStorage.getItem).toBeCalledWith('some-key');
  expect(value).toMatchObject({key: 'value'});
});

test('get returns null for missing keys', async () => {
  AsyncStorage.getItem = jest.fn().mockResolvedValue(null);
  const cache = new Cache();
  expect(await cache.get('missing-key')).toBe(null);
});
