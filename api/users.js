import jwt from 'jsonwebtoken';

const users = {};

users.login = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    global.logger.warn('Missing body data: username or password');
    return res.status(404).send({
      error: 'Missing body data: username or password'
    });
  }

  const payload = {
    username: req.body.username,
    password: req.body.password
  };

  const token = jwt.sign(
    payload,
    'secret',
    { expiresIn: '1h' }
  );

  return res.status(201).send({ accessToken: token });
};

export default users;
