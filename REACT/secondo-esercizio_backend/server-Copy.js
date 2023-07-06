const express = require('express');                  // Pomeriggio 
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());  // pomeriggio, da aggiungere
// Dummy user data for demonstration

const dummyUser = {
    username: 'user',
    password: 'password',
    name:'John Doe',
};

const SECRET_KEY = 'mysecretkey';

app.post('/api/authenticate', (req, res) => {
const { username, password } = req.body;

//in a real-world app, you should veirfy the iser's credentials form a database
if (username === dummyUser.username && password === dummyUser.password) {         // === converte variabile nella  destinazione 
    //generate a token
const token = jwt.sign({ name: dummyUser.name }, SECRET_KEY, {
    expiresIn: '1h',
});
    
    //send the token
    res.json ({token});
} else {
    res.status(401).json({ message: 'Invalid username or password'});  
}
});

app.listen(PORT, () => {
    console.log(`Server running on http://locaalhost:${PORT}`);
});