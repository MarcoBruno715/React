import React, { useState, useEffect }  from  'react';
import './App.css';
import Header from './components/Header';
import Bio from './components/Bio';
import Contacts from './components/Contacts';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Login from './components/Login';
import jwt_decode from 'jwt-decode';


function App () {
  
  const [isAuthenticated, setIsAuthenticated] = useState(!localStorage.getItem('token'));
  // eslint-disable-next-line                         
  const [userData, setUserData] = useState(() => {
    const token = localStorage.getItem('token');
    return token ? jwt_decode (token) : null;
  });


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      setIsAuthenticated(jwt_decode(token));
    }
  }, []);

  const handleLogin = (token) => {
    const decoded = jwt_decode(token);
    setUserData(decoded);
    setIsAuthenticated(true);
    localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    localStorage.removeItem('token');
  };

  return (

    <div className="App">
           <Header/>
           {isAuthenticated ? (                  //viene visualizzato solo quando lo stato del componente e authenticated
            <>
            <button onClick={handleLogout}>Logout</button>
           <Contacts/>
           <Bio/>
           <Skills/>
           <Projects/>
           </>
           ) : (
            <Login onLogin={handleLogin} />
           )}
    </div>

           );
           };
  
  export default App;