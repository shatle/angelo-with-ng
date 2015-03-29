define([], function() {
  var AWS;
  return AWS = (function() {
    function AWS(host) {
      this.host = host;
      this.ws = new WebSocket('ws://' + this.host);
      this.response = {};
      this.__message();
    }

    AWS.prototype.__open = function(cb) {
      return this.ws.onopen = function(d) {
        if (typeof cb === "function" ? cb() : void 0) {
          return cb(d);
        }
      };
    };

    AWS.prototype.__message = function() {
      return this.ws.onmessage = function(d) {
        console.log("onmessage,,,,", d, JSON.parse(d));
        d = JSON.parse(d);
        if (d.req_name && this.response[d.req_name]) {
          return this.response[d.req_name](d.data);
        }
      };
    };

    AWS.prototype.__send = function(name, data) {
      var data_string;
      data_string = JSON.stringify({
        req_name: this.__replaceIllegalWords(name),
        data: data
      });
      if (name && data) {
        return this.ws.send(data_string);
      }
    };

    AWS.prototype.__replaceIllegalWords = function(name) {
      return name.replace(/\W/g, '_');
    };

    AWS.prototype.__registerResponse = function(name, cb) {
      var reg_name;
      if (!name || !(typeof cb === "function" ? cb() : void 0)) {
        return console.error('Error args,...');
      }
      reg_name = this.__replaceIllegalWords(name);
      if (!this.response[reg_name]) {
        return this.response[reg_name] = cb;
      } else {
        return console.error("U have already set name: " + reg_name + " from " + name + "! ");
      }
    };

    AWS.prototype.res = function(name, cb) {
      if (name && cb) {
        return __registerResponse(name, cb);
      }
    };

    AWS.prototype.req = function(name, query) {
      if (name && query) {
        return __send(name, query);
      }
    };

    return AWS;

  })();
});
