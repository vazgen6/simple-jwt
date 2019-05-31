const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const expressJWT = require('express-jwt');
const PORT = process.env.PORT || 8888;
const users = [
    { id: 1, username: 'admin', password: 'admin' },
    { id: 2, username: 'guest', password: 'guest' },
];
app.use(bodyParser.json());
const jwtCheck = expressJWT({
    secret: 'mysecret'
});
app.use(cors());
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).send('You need username and password');
        return;
    }
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        res.status(401).send('User not found');
        return;
    }
    const token = jwt.sign({
        sub: user.id,
        username
    }, 'mysecret', { expiresIn: '3 hours' });
    res.status(200).send({ access_token: token });
})

app.get('/status', (req, res) => {
    const time = (new Date()).toLocaleTimeString();

    res.status(200).send(`Server Time is ${time}`);
});

app.get('/resource', (req, res) => {
    res.status(200).send(`Publice resource u can see this`);
});

app.get('/resource/secret', jwtCheck, (req, res) => {
    res.status(200).send('secret resource, you should be logged in to see this');
})

app.get('*', (req, res) => {
    res.sendStatus(404);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
