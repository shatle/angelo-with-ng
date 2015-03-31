define([], function() {
  var AWS;
  return AWS = (function() {
    function AWS(host) {
      this.host = host;
      this.ws = new WebSocket('ws://' + this.host);
      this.response = {};
      this.__message();
    }

    AWS.prototype.__waitCon = function(cb, interval) {
      if (this.ws.readyState === 1) {
        return cb && cb();
      } else {
        return setTimeout((function(_this) {
          return function() {
            return _this.__waitCon(cb, interval);
          };
        })(this), interval);
      }
    };

    AWS.prototype.__open = function(cb) {
      return this.ws.onopen = function(d) {
        if (typeof cb === "function" ? cb() : void 0) {
          return cb(d);
        }
      };
    };

    AWS.prototype.__message = function() {
      return this.ws.onmessage = (function(_this) {
        return function(d) {
          d = JSON.parse(d.data);
          if (d.req_name && _this.response[d.req_name]) {
            return _this.response[d.req_name](d.data);
          }
        };
      })(this);
    };

    AWS.prototype.__send = function(name, data) {
      return this.__waitCon((function(_this) {
        return function() {
          var data_string;
          data_string = JSON.stringify({
            req_name: _this.__replaceIllegalWords(name),
            data: data
          });
          if (name && data) {
            return _this.ws.send(data_string);
          }
        };
      })(this), 1000);
    };

    AWS.prototype.__replaceIllegalWords = function(name) {
      return name.replace(/\W/g, '_');
    };

    AWS.prototype.__registerResponse = function(name, cb) {
      var reg_name;
      if (!name || !cb) {
        return console.log('Error args,...');
      }
      reg_name = this.__replaceIllegalWords(name);
      if (!this.response[reg_name]) {
        return this.response[reg_name] = cb;
      } else {
        return console.log("U have already set name: " + reg_name + " from " + name + "! ");
      }
    };

    AWS.prototype.res = function(name, cb) {
      if (name && cb) {
        return this.__registerResponse(name, cb);
      }
    };

    AWS.prototype.req = function(name, query) {
      if (name && query) {
        return this.__send(name, query);
      }
    };

    return AWS;

  })();
});
