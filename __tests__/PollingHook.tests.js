import {renderHook} from '@testing-library/react-hooks';
import usePolling from '../src/util/PollingHook';

test('callback is called expected amount of times', () => {
  jest.useFakeTimers();
  const callback = jest.fn();
  renderHook(() => usePolling(1000, callback));
  jest.advanceTimersByTime(3000);
  expect(callback.mock.calls.length).toBe(3);
});
