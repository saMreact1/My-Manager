exports.tenantFilter = (req, res, next) => {
  if(!req.user || !req.user.tenantId) {
    return res.status(400).json({ message: 'Unauthorized: Missing tenant ID' });
  }

  // Attach tenantId for later use
  req.tenantId = req.user.tenantId;
  next();
};