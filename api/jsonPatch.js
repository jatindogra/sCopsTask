import jsonpatch from 'json-patch';
import _ from 'underscore';

const jsonPatch = {};

jsonPatch.apply = async (req, res) => {
  if (!req.body.json || !req.body.patch) {
    global.logger.warn('Missing body data: json or patch');
    return res.status(404).send({
      error: 'Missing body data: json or patch'
    });
  }

  if (!_.isObject(req.body.json)) {
    global.logger.warn('Invalid body data: json should be an object ');
    return res.status(404).send({
      error: 'Invalid body data: json should be an object'
    });
  }

  if (!_.isArray(req.body.patch)) {
    global.logger.warn('Invalid body data: patch should be an array ');
    return res.status(404).send({
      error: 'Invalid body data: patch should be an array'
    });
  }

  const json = req.body.json;
  const patch = req.body.patch;

  const appliedJSONPatch = jsonpatch.apply(json, patch);
  global.logger.info('Applied JSON patch successfully');
  return res.status(201).send({ result: appliedJSONPatch });
};

export default jsonPatch;
