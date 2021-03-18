import React from 'react';

export default function usePolling(timeout, callback) {
  React.useEffect(() => {
    const intervalId = setInterval(callback, timeout);
    return () => {
      clearInterval(intervalId);
    };
  });
}
