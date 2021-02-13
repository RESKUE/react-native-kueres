import React from 'react';
import Cache from './Cache';
import Client from './Client';

export default function useClient(customClient = null) {
  const [result, setResult] = React.useState(null);
  const client = React.useMemo(() => customClient || new Client(new Cache()), [
    customClient,
  ]);

  React.useEffect(() => {
    function handleResponse(data, error, source) {
      setResult({
        data: data || result.data,
        error: error,
        source: source,
      });
    }
    return client.subscribe(handleResponse);
  });

  return {client, result};
}
