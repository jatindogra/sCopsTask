import path from 'path';
import validateToken from './validateToken';
import status from './status';
import users from './users';
import jsonPatch from './jsonPatch';
import images from './images';

const routes = (app) => {
  app.get('/swagger.yml', (req, res) => {
    res.sendFile(path.join(__dirname, '../swagger.yml'));
  });
  app.get('/status', status);
  // user
  app.post('/auth', (req, res) => {
    users.login(req, res);
  });
  // json-patch
  app.post('/jsonpatch', validateToken, (req, res) => {
    jsonPatch.apply(req, res);
  });
  // image-resize
  app.post('/resize', validateToken, (req, res) => {
    images.resize(req, res);
  });
};

export default routes;
