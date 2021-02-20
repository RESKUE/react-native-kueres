import React from 'react';
import AuthContext from './AuthContext';

export default function AuthProvider({authService, children}) {
  const [authStatus, setAuthStatus] = React.useState(null);
  const [accessToken, setAccessToken] = React.useState(null);

  React.useEffect(() => {
    function callback(status) {
      setAuthStatus(status);
      setAccessToken(status?.access_token);
    }
    return authService.subscribe(callback);
  });

  React.useEffect(() => {
    authService.autoLogin();
  }, [authService]);

  return (
    <AuthContext.Provider value={{authService, authStatus, accessToken}}>
      {children}
    </AuthContext.Provider>
  );
}
