import jwt from 'jsonwebtoken';

const validateToken = (req, res, next) => {
  let token;
  if (req.headers.authorization &&
    req.headers.authorization.indexOf('accessToken') === 0) {
    token = req.headers.authorization.split(' ')[1];
    global.logger.info('Found accessToken in Header');
  }
  if (!token) {
    global.logger.warn('Failed to find accessToken in Header');
    return res.status(404).send({
      error: 'Failed to find accessToken in Header'
    });
  }
  jwt.verify(token, 'secret', (err) => {
    if (err) {
      global.logger.error('Failed to authenticate accessToken');
      return res.status(403).send({
        error: `Failed to authenticate accessToken with err: ${err}`
      });
    }
    global.logger.info('Token is successfully authenticated');
    return next();
  });
  return true;
};

export default validateToken;
