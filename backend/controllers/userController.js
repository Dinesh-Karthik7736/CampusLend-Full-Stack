const User = require('../models/usermodel');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  // req.user is attached by the protect middleware
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      picture: user.picture,
      phone: user.phone,
      address: user.address,
      collegeYear: user.collegeYear,
      dob: user.dob,
      trustScore: user.trustScore,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;
    user.collegeYear = req.body.collegeYear || user.collegeYear;
    user.dob = req.body.dob || user.dob;
    
    // For profile picture, you'd handle file upload here and save the URL
    if (req.body.picture) {
        user.picture = req.body.picture;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      picture: updatedUser.picture,
      phone: updatedUser.phone,
      address: updatedUser.address,
      collegeYear: updatedUser.collegeYear,
      dob: updatedUser.dob,
      trustScore: updatedUser.trustScore,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

module.exports = { getUserProfile, updateUserProfile };
