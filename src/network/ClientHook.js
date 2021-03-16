import React from 'react';
import Cache from './Cache';
import Client from './Client';
import AuthContext from '../auth/AuthContext';

export default function useClient({authenticated = false} = {}) {
  const [result, setResult] = React.useState(null);
  const {accessToken} = React.useContext(AuthContext);

  const client = React.useMemo(() => {
    let defaultHeaders = {};
    if (authenticated) {
      defaultHeaders = {Authorization: `Bearer ${accessToken}`};
    }
    return new Client(new Cache(), defaultHeaders);
  }, [authenticated, accessToken]);

  React.useEffect(() => {
    function handleResponse({data, error, source}) {
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
