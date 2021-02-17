import React from 'react';
import Cache from './Cache';
import Client from './Client';

export default function useClient() {
  const [result, setResult] = React.useState(null);
  const client = React.useMemo(() => new Client(new Cache()), []);

  React.useEffect(() => {
    function handleResponse(data, error, source) {
      setResult({
        data: data || result?.data || null,
        error: error,
        source: source,
      });
    }
    return client.subscribe(handleResponse);
  });

  return {client, result};
}
