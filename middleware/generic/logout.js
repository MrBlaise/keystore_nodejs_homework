/**
 * Log the current user out
 */
module.exports = function (objectRepository) {
  return function (req, res, next) {
    req.session.destroy(function (err) {
      return next(err);
    });
  };
};
