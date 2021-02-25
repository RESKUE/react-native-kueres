import React from 'react';
import AuthContext from './AuthContext';

export default function AuthProvider({authService, children}) {
  const [authStatus, setAuthStatus] = React.useState(null);
  const [accessToken, setAccessToken] = React.useState(null);
  const [clientRoles, setClientRoles] = React.useState([]);

  React.useEffect(() => {
    function callback(newLoginStatus, newAccessToken, newClientRoles) {
      setAuthStatus(newLoginStatus);
      setAccessToken(newAccessToken);
      setClientRoles(newClientRoles);
    }
    return authService.subscribe(callback);
  });

  React.useEffect(() => {
    authService.autoLogin();
  }, [authService]);

  return (
    <AuthContext.Provider
      value={{authService, authStatus, accessToken, clientRoles}}>
      {children}
    </AuthContext.Provider>
  );
}
