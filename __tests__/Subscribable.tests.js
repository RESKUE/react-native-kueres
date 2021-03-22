import Subscribable from '../src/util/Subscribable';

test('the subscribers list is empty by default', () => {
  const subject = new Subscribable();
  expect(subject.subscribers).toEqual([]);
});

test('subscribing', () => {
  const cb1 = jest.fn();
  const cb2 = jest.fn();
  const subject = new Subscribable();
  subject.subscribe(cb1);
  subject.subscribe(cb2);
  expect(subject.subscribers).toEqual([cb1, cb2]);
});

test('unsubscribing', () => {
  const cb1 = jest.fn();
  const cb2 = jest.fn();
  const subject = new Subscribable();
  subject.subscribe(cb1);
  subject.subscribe(cb2);
  expect(subject.subscribers).toEqual([cb1, cb2]);
  subject.unsubscribe(cb1);
  expect(subject.subscribers).toEqual([cb2]);
  subject.unsubscribe(cb2);
  expect(subject.subscribers).toEqual([]);
});

test('using the unsubribe callback', () => {
  const cb = jest.fn();
  const subject = new Subscribable();
  const unsubscribe = subject.subscribe(cb);
  expect(subject.subscribers).toEqual([cb]);
  unsubscribe();
  expect(subject.subscribers).toEqual([]);
});

test('subscribers receive notifications', () => {
  const cb1 = jest.fn();
  const cb2 = jest.fn();
  const subject = new Subscribable();
  subject.subscribe(cb1);
  subject.subscribe(cb2);
  subject.notify('arg1', 'arg2');
  expect(cb1.mock.calls.length).toBe(1);
  expect(cb2.mock.calls.length).toBe(1);
});

test('notify can supply dynamic arguments of different types', () => {
  const cb = jest.fn();
  const subject = new Subscribable();
  subject.subscribe(cb);
  subject.notify('hello world', 42, {key: 'value'});
  expect(cb.mock.calls[0][0]).toBe('hello world');
  expect(cb.mock.calls[0][1]).toBe(42);
  expect(cb.mock.calls[0][2]).toMatchObject({key: 'value'});
});
