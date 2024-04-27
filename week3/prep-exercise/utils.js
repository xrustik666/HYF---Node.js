import jsonwebtoken from 'jsonwebtoken';

const SECRET = 'secret';

// JWT creator
export const createToken = (user) => {
  return jsonwebtoken.sign(user, SECRET);
};

// JWT validator
export const verifyToken = (token) => {
  try {
    return jsonwebtoken.verify(token, SECRET);
  } catch (error) {
    return null;
  }
};

// Session ID extractor
export const getSessionId = (req) => {
  const authorizationHeader = req.headers['authorization'];
  if (!authorizationHeader) {
    return null;
  }
  return authorizationHeader.replace('Bearer ', '').trim();
};