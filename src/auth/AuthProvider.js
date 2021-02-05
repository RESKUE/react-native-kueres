import React from 'react';
import AuthContext from './AuthContext';

export default function AuthProvider({authService, children}) {
  const [authStatus, setAuthStatus] = React.useState(null);

  React.useEffect(() => {
    const callback = (status) => setAuthStatus(status);
    return authService.subscribe(callback);
  });

  return (
    <AuthContext.Provider value={{authService, authStatus}}>
      {children}
    </AuthContext.Provider>
  );
}
