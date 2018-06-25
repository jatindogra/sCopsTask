import jimp from 'jimp';
import uuid from 'uuid/v1';
import _ from 'underscore';

const images = {};

images.resize = async (req, res) => {
  if (!req.body.imageUrl) {
    global.logger.warn('Missing body data: imageUrl');
    return res.status(404).send({
      error: 'Missing body data: imageUrl'
    });
  }

  if (!_.isString(req.body.imageUrl)) {
    global.logger.warn('Invalid body data: imageUrl should be a string ');
    return res.status(404).send({
      error: 'Invalid body data: imageUrl should be a string'
    });
  }

  const id = uuid().substring(0, 5);
  const originalImage = req.body.imageUrl;

  jimp.read(originalImage, (err, resImg) => {
    if (err) {
      global.logger.error('Failed to read image');
      return res.status(404).send({
        error: `Failed to read image with err: ${err}`
      });
    }
    global.logger.info('Successfully read the image');

    resImg.resize(50, 50).write(`images/resizedImg-${id}.jpg`, (error) => {
      if (error) {
        global.logger.error('Failed to resize image');
        return res.status(500).send({
          error: `Failed to resize image with err: ${error}`
        });
      }

      global.logger.info('Successfully resized the image');
      return res.status(201).sendFile(`/images/resizedImg-${id}.jpg`, {
        root: '.'
      });
    });
    return true;
  });
  return true;
};

export default images;
