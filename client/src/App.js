import React, {useState, useEffect} from 'react';
import Navigation from './Navigation.jsx';
import Main from './Main.jsx';
import Library from './Library.jsx';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userImage, setUserImage] = useState('');

  const checkLogin = React.useCallback((img) => {
    if (img) {
      setUserImage(img);
      setLoggedIn(true);
    } else {
      setUserImage('');
      setLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  let path = window.location.pathname;
  return (
    <div className="App">
      <Navigation userImage={userImage} isLoggedIn={isLoggedIn} checkLogin={checkLogin} />
      {path === '/library' ? <Library isLoggedIn={isLoggedIn} /> : <Main isLoggedIn={isLoggedIn} />}
    </div>
  );
}

export default App;
