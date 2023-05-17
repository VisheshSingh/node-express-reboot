const createToken = require('./createToken');

const attachCookiesToResponse = (res, user) => {
  const oneDay = 1000 * 60 * 60 * 24;
  const token = createToken(user);
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  });
};

module.exports = attachCookiesToResponse;
