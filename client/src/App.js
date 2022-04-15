import { useContext } from 'react';
import { UserContext } from './contexts/UserContext';
import UnauthApp from './views/UnathApp';
import AuthApp from './views/AuthApp';

function App() {
  const { auth } = useContext(UserContext);
  return auth? <AuthApp /> : <UnauthApp />
}

export default App;
