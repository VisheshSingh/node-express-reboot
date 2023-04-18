const register = (req, res) => {
  res.json({ msg: 'REGISTER' });
};

const login = (req, res) => {
  res.json({ msg: 'login' });
};

const logout = (req, res) => {
  res.json({ msg: 'logout' });
};

module.exports = {
  register,
  login,
  logout,
};
