/**
 * When the user visits the / main page,
 * should be redirected to
 *    - /login when not signed in
 *    - /keys when signed in
 */
module.exports = function (objectRepository) {
  return function (req, res, next) {
    // TODO: change this when we have sessions according to the comment
    return res.redirect('/log-in');
  };

};
