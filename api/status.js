const status = (req, res) => {
  res.status(200).send({ status: 'Ok' });
};

export default status;
