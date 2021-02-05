import React from 'react';
import Cache from './Cache';
import Client from './Client';

export default function useClient(customClient = null) {
  const [result, setResult] = React.useState({});
  const client = customClient || new Client(new Cache());

  React.useEffect(() => {
    function handleResponse(data, error, source) {
      setResult({
        data: data || result.data,
        error: error,
        source: source,
      });
    }
    client.subscribe(handleResponse);
  });

  return {client, result};
}
