
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Bio from './components/Bio';
import Contatti from './components/Contatti';
import Progetti from './components/Progetti';
import Competenze from './components/Competenze';
import Login from './components/Login';
import axios from 'axios';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  const handleLogin = (token) => {
    setToken(token);
    setIsAuthenticated(true);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  return (
    <div>
      <Header/>
      <Bio/>
      <Progetti/>
          <Competenze/>
      {isAuthenticated ? (
        <React.Fragment>
         
        </React.Fragment>


      ) : (
        <Login onLogin={handleLogin} />
      )}
      <Contatti />
    </div>
  );
}

export default App;