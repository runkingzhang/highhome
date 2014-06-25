// static page
// About
exports.about = function (req, res, next) {
  res.render('static/about');
};
exports.blog = function (req, res, next) {
  res.render('static/blog');
};
exports.help = function (req, res, next) {
  res.render('static/help');
};
exports.support = function (req, res, next) {
  res.render('static/support');
};
exports.contact = function (req, res, next) {
  res.render('static/contact');
};
// FAQ
exports.faq = function (req, res, next) {
  res.render('static/faq');
};
exports.signin = function (req, res, next) {
  res.render('sign/signin');
};

