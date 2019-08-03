module.exports = (req, res, next) => {
  if (typeof req.user.credits === 'number' && req.user.credits < 1) {
    return res.status(403).json({ error: 'Not enough credits' });
  }
  return next();
};
