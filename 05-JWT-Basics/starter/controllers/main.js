const CustomAPIError = require('../errors/custom-error');

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new CustomAPIError('Please provide valid username and password', 400);
  }

  res.status(200).json({ msg: 'Login success' });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100 + 1);
  res
    .status(200)
    .json({ msg: 'Hello!', secret: `Your lucky number is ${luckyNumber}` });
};

module.exports = {
  login,
  dashboard,
};
