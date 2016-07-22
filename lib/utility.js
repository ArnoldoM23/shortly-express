var request = require('request');

exports.getUrlTitle = function(url, cb) {
  request(url, function(err, res, html) {
    if (err) {
      console.log('Error reading url heading: ', err);
      return cb(err);
    } else {
      var tag = /<title>(.*)<\/title>/;
      var match = html.match(tag);
      var title = match ? match[1] : url;
      return cb(err, title);
    }
  });
};

var rValidUrl = /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i;

exports.isValidUrl = function(url) {
  return url.match(rValidUrl);
};

/************************************************************/
// Add additional utility functions below
/************************************************************/
exports.isLoggedIn = function(req, res){

  return req.session ? !!req.session.user : false;

};

exports.checkUser = function(req, res, next){
  if (!exports.isLoggedIn(req)) {
    res.redirect('/login')
  }else{
    next();
  }
}
exports.createSession = function(req, res, newUser){
  // The regenerate function creates a session. if the session object is empty it just gives it an id if the session object is not empty it destroy that session and creates a new session with a new has and cookie.
  return req.session.regenerate(function(){
    // Here we create a user property in the session and assing the current user as the value.
    req.session.user = newUser;
    // after the session is created we redirect the user to the home page/ home url
    res.redirect('/')
  });
}

