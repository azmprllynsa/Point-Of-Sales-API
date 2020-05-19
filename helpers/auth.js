const jwt = require('jsonwebtoken');

module.exports = {
  verify: (req, res, next) => {
    const token = req.headers.authorization;

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      console.log(decoded);
      req.id_user = decoded.id;
      next();
    } catch (err) {
      res.status(400).json({
        message: 'token invalid',
      });
    }
  },
};
