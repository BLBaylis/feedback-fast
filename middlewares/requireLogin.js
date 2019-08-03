module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Please log in' });
  }
  return next();
};
