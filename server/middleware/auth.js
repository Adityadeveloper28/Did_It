const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
//   console.log("Auth Middleware Invoked", authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ error: 'No token provided', message: ' Authorization denied' });
  }

  const token = authHeader.split(' ')[1];
//   console.log("Extracted Token:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded Token:", decoded);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: 'Token is not valid', message: 'Invalid token' });
  }
};

module.exports = auth;
