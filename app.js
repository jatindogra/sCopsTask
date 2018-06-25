import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import routes from './api/routes';
import logger from './logger';

global.logger = logger;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize Routes
routes(app);

app.listen(process.env.PORT || 3001, () => {
  global.logger.info('Node Server Started');
});

export default app;
