const User = require('../models/usermodel');

// @desc    Authenticate user with Google Sign-In & get/create user in DB
// @route   POST /api/auth/google-signin
// @access  Public
const googleSignIn = async (req, res) => {
  const { uid, email, displayName, photoURL } = req.body;

  if (!uid || !email) {
    return res.status(400).json({ message: 'Invalid user data provided' });
  }

  try {
    let user = await User.findById(uid);

    // If user doesn't exist, create a new one
    if (!user) {
      user = await User.create({
        _id: uid, // Use Firebase UID as the primary key
        name: displayName,
        email: email,
        picture: photoURL,
      });
    }

    // Return user data (you could also generate and return a JWT here if you wanted a session independent of Firebase)
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      picture: user.picture,
      trustScore: user.trustScore,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during sign-in process' });
  }
};

module.exports = { googleSignIn };
