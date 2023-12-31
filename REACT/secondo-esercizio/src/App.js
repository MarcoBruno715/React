import React, { useState, useEffect }  from  'react';
import './App.css';
import Header from './components/Header';
import Bio from './components/Bio';
import Contacts from './components/Contacts';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Login from './components/Login';
import jwt_decode from 'jwt-decode';
import Register from './components/Register';
import Profile from './components/Profile';
import styles from './Button.module.css';




function App () {
 
  
  /* Con teliw
const buttonStyle = {
  backgroundColor: 'blue',
  color:'white',
  padding: '10px'

  <button </div> style={buttonStyle} onClick={() => setIsRegistering(true)}>Register</button>

};
*/

  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  // eslint-disable-next-line  
  const [isRegistering, setIsRegistering] = useState(false);                        
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



  const handleRegisterSuccess = () => {
    setIsRegistering(false);
  };

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
                                                  //  apre il logout
    <div className="App">                            
           <Header/>                            
           {isAuthenticated ? (                         // viene visualizzato solo quando lo stato del componente e authenticated  , Importiamo il Profile                  
            <>
            <button onClick={handleLogout}>Logout</button>
            <Profile  user={userData} />    
           <Contacts/>
           <Bio/>
           <Skills/>
           <Projects/>
           </>
           ) : isRegistering ? (
            <Register onRegisterSuccess={handleRegisterSuccess} />
           ) : (
            <div>
            <Login onLogin={handleLogin} />

           <button  className={styles.button} onClick={() => setIsRegistering(true)}>Register</button>
          
            </div>
           )}
    </div>

           );
           };
  
  export default App;