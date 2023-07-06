import axios from 'axios';//login
import React, { useState } from 'react';

const Register = ({ onRegisterSuccess }) => {      //funzione di ritorno che ritorna all'html
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/api/register', { username, password, name });
            onRegisterSuccess();
        } catch (error) {
            console.error('Error during registration', error);
        }
    };



    return (
    // si puo anche mettere tutto nella stessa riga, per rendere piu chiaro lo si mette a capo senza le terminazioni

    <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />

        <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />

        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Register</button>

    </form>


   );
    

};


export default Register;
