const express = require('express');                  // Pomeriggio 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());  // pomeriggio, da aggiungere

// Dummy user data for demonstration
/* //Non viene utilizzata in questo caso perchè abbiamo il form di register.
const dummyUser = {
    username: 'user',
    password: 'password',
    name:'John Doe',
};
*/
const SECRET_KEY = 'mysecretkey';



//Simulated in-memory database

let users = [];

app.post('/api/register', async (req, res) => {
    const { username, password, name } = req.body;

const hashedPassword = await bcrypt.hash(password, 10);

users.push({
    username,
    password: hashedPassword,
    name,
    });
     
    res.status(201).json({message: 'User registered'});
    });


app.post('/api/authenticate', async (req, res) => {
const { username, password } = req.body;

const user = users.find(user => user.username === username );

if (user && await bcrypt.compare(password, user.password)) {
const token = jwt.sign({ name: user.name }, SECRET_KEY, {
    expiresIn: '1h',
});

res.json({ token });
} else {
 res.status(401).json({message: 'Invalid username or password'});
}
});

/*
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
*/
app.listen(PORT, () => {
    console.log(`Server running on http://locaalhost:${PORT}`);
});