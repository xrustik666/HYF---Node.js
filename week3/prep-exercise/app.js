import express from 'express';
import { hash, compare } from 'bcrypt';
import { register, login, profile, logout } from './users.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// DEFAULT endpoint
app.get('/', (req, res) => {
  res.send('Hello, world');
});

// REGISTRATION endpoint
app.post('/register', register);

// LOGIN endpoint
app.post('/login', login);

// PROFILE endpoint
app.get('/profile', profile);

// LOGOUT endpoint
app.post('/logout', logout);

app.listen(PORT);