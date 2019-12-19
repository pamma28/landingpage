"use strict";

module.exports = function(AuthService) {
  // ================================================================
  //            checkPhoneNumber
  // ================================================================
  AuthService.remoteMethod("checkPhoneNumber", {
    accepts: [
      {
        arg: "phoneNumber",
        type: "Object",
        required: true
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

  AuthService.checkPhoneNumber = async phoneNumber => {
    try {
      if (!phoneNumber || typeof phoneNumber != "number") {
        throw new Error("params incomplete or not a number");
      }
      const User = app.models.User;
      const valid = await new Promise(resolve => {
        User.find(
          {
            where: { phoneNumber: phoneNumber },
            fields: ["id"]
          },
          (err, res) => {
            if (err) {
              throw err;
            } else {
              resolve(res.length > 0 ? true : false);
            }
          }
        );
      });

      return { valid: valid };
    } catch (e) {
      throw e.message;
    }
  };

  // ================================================================
  //            checkEmail
  // ================================================================
  AuthService.remoteMethod("checkEmail", {
    accepts: [
      {
        arg: "email",
        type: "string",
        required: true
      }
    ],
    returns: {
      arg: "data",
      type: "object",
      root: true
    },
    http: {
      path: "/checkEmail",
      verb: "get"
    }
  });

  AuthService.checkEmail = async email => {
    try {
      if (!email || typeof phoneNumber != "string") {
        throw new Error("params incomplete or not a string");
      }
      const User = app.models.User;
      const valid = await new Promise(resolve => {
        User.find(
          {
            where: { email: email },
            fields: ["id"]
          },
          (err, res) => {
            if (err) {
              throw err;
            } else {
              resolve(res.length > 0 ? true : false);
            }
          }
        );
      });

      return { valid: valid };
    } catch (e) {
      throw e.message;
    }
  };
};
