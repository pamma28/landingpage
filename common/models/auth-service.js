"use strict";

module.exports = function(AuthService) {
  AuthService.remoteMethod("checkPhoneNumber", {
    accepts: [
      {
        arg: "params",
        type: "Object",
        required: true,
        http: {
          source: "body"
        }
      }
    ],
    returns: {
      arg: "data",
      type: "object",
      root: true
    },
    http: {
      path: "/checkPhoneNumber",
      verb: "get"
    }
  });

  AuthService.checkPhoneNumber = async params => {
    try {
      return true;
    } catch (e) {
      throw e.message;
    }
  };
};
