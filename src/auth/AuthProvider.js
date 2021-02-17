import React from 'react';
import AuthContext from './AuthContext';

export default function AuthProvider({authService, children}) {
  const [authStatus, setAuthStatus] = React.useState(null);
  const [idToken, setIdToken] = React.useState(null);

  React.useEffect(() => {
    function callback(status) {
      setAuthStatus(status);
      setIdToken(status?.idToken);
    }
    return authService.subscribe(callback);
  });

  React.useEffect(() => {
    authService.autoLogin();
  }, [authService]);

  return (
    <AuthContext.Provider value={{authService, authStatus, idToken}}>
      {children}
    </AuthContext.Provider>
  );
}
