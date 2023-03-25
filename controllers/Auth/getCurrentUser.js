const getCurrentUser = async (req, res) => {
  try {
    const { email, subscription } = req.user;
    res.json({ email, subscription });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = getCurrentUser;
