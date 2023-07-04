const express = require('express');
const jwt = require ('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());

const SECRET_KEY = 'mySecretKey';

const users = [
 {

username: 'user1',
password: '123'

}

];


app.post('/login', async(req, res) => {
    const {username, password} = req.body;

    const user = users.find(u => u.username === username);
    if(user && await bcrypt.compare(password, user.password)) {
const token = jwt.sign({ username: user.username}, SECRET_KEY, { expiresIn: '1h'});
return res.json({token});
    }

    return res.status(401).send('Invalid credentials');
});

app.get('/projects', (req, res) => {
    const authHeader = req.headers['authorization'];  // ricordati di non metttere gli spazi !!
    const token = authHeader && authHeader.split('')[1];

    if(!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err) => {
        if (err) return res.sendStatus(401);
        res.json([
            {id: 1, name: 'Progetto 1' },
            {id: 2, name: 'Progetto 2' }
        ]);
    });
});

app.listen(3001, () => {
    console.log('Server listening on port 3001');
});
