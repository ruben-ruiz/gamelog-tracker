import React from 'react';
import Navigation from './Navigation.jsx';
import Main from './Main.jsx';
import Library from './Library.jsx';

function App() {
  let path = window.location.pathname;
  return (
    <div className="App">
      <Navigation />
      {path === '/library' ? <Library /> : <Main />}
    </div>
  );
}

export default App;
