module.exports = (req, res, next) => {
  if (req.user) {
    return res.status(422).json({ error: 'Already logged in' });
  }
  return next();
};
