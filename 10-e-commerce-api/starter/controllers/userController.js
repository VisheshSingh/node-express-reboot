const getAllUsers = async (req, res) => {
  res.send('GET ALL USERS');
};

const getSingleUser = async (req, res) => {
  res.send('GET SINGLE USER');
};

const showCurrentUser = async (req, res) => {
  res.send('Show Current User');
};

const updateUser = async (req, res) => {
  res.send('UPDATE USER');
};

const updatePassword = async (req, res) => {
  res.send('update password');
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updatePassword,
};
