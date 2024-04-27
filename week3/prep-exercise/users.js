import { hash, compare } from 'bcrypt';
import { createToken, verifyToken, getSessionId } from './utils.js';

const SECRET = 'secret';

const usersDatabase = [];
const sessions = {};

// User validator
export const isValidUser = (user) => {
  if (!user.username || !user.password) {
    return false;
  }
  return true;
};

// Password checker
export const checkPassword = (username, password) => {
  const user = usersDatabase.find((user) => user.username === username);
  return user && compare(password, user.password);
};

// REGISTRATION middleware
export const register = async (req, res) => {
  const newUser = {
    username: req.body.username,
    password: await hash(req.body.password, 10),
  };

  if (!isValidUser(newUser)) {
    res.status(400).send("Invalid user");
    return;
  }

  usersDatabase.push(newUser);

  res.status(201).send({ users: usersDatabase });
};

// LOGIN middleware
export const login = (req, res) => {
  const { username, password } = req.body;

  if (!checkPassword(username, password)) {
    res.status(401).json({ message: 'Invalid username / password combination' }).end();
    return;
  }

  const token = createToken({ username });

  res.status(200).json({ token }).end();
};

// PROFILE middleware
export const profile = (req, res) => {
  const sessionId = getSessionId(req);
  const decodedUser = verifyToken(sessionId);

  if (!decodedUser) {
    res.status(401).json({ message: 'Not logged in' }).end();
    return;
  }

  const username = decodedUser.username;
  const message = `Hello, you are logged in as ${username}!`;

  res.status(200).json({ message }).end();
};

// LOGOUT middleware
export const logout = (req, res) => {
  const sessionId = getSessionId(req);

  if (!sessionId || !verifyToken(sessionId)) {
    res.status(401).json({ message: 'Not logged in' }).end();
    return;
  }

  const decodedUser = verifyToken(sessionId);
  const username = decodedUser.username;
  const userIndex = usersDatabase.findIndex(user => user.username === username);

  if (userIndex !== -1) {
    usersDatabase.splice(userIndex, 1);
  }

  res.status(204).end();
};