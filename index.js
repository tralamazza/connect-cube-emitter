var cube = require("cube");
var url = require('url');

/**
* options = {
*   collector: 'ws://127.0.0.1:1080',
*   type: 'request'
* }
*/
module.exports = function middleware(options) {
  options = options || {};
  var client = cube.emitter(options.collector || 'ws://127.0.0.1:1080');

  return function (req, res, next) {
    if (res._cube) return next();
    res._cube = true;

    var start = new Date();

    res.on('header', function(header) {
      var now = new Date();
      
      var data = {
        duration: now - start,
        status: res.statusCode,
        method: req.method,
        url: url.parse(req.url, true)
      };

      client.send({
        type: options.type || 'request',
        time: now,
        data: data
      });
    });

    next();
  };
};
