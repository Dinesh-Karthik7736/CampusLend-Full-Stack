const admin = require('firebase-admin');
const User = require('../models/usermodel');
require('dotenv').config();

// Initialize Firebase Admin SDK
// We decode the base64 string from the .env file back into a JSON object
const serviceAccountBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
if (!serviceAccountBase64) {
  throw new Error('FIREBASE_SERVICE_ACCOUNT_BASE64 is not defined in .env file');
}
const serviceAccount = JSON.parse(Buffer.from(serviceAccountBase64, 'base64').toString('ascii'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decodedToken = await admin.auth().verifyIdToken(token);
      
      // Get user from the database using the Firebase UID
      // and attach it to the request object
      req.user = await User.findById(decodedToken.uid);

      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
