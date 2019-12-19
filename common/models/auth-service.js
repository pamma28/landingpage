"use strict";

module.exports = function(AuthService) {
  let app = require("../../server/server");
  // ================================================================
  //            checkPhoneNumber
  // ================================================================
  AuthService.remoteMethod("checkPhoneNumber", {
    accepts: [
      {
        arg: "phoneNumber",
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
      path: "/checkPhoneNumber",
      verb: "get"
    }
  });

  AuthService.checkPhoneNumber = async phoneNumber => {
    try {
      if (!phoneNumber || isNaN(phoneNumber)) {
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
              resolve(res.length > 0 ? false : true);
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
      if (!email || typeof email != "string") {
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
              resolve(res.length > 0 ? false : true);
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
  //              register
  // ================================================================
  AuthService.remoteMethod("register", {
    accepts: [
      {
        arg: "params",
        type: "object",
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
      path: "/register",
      verb: "post"
    }
  });

  AuthService.register = async params => {
    try {
      const User = app.models.User;
      const instantiate = await new Promise(resolve => {
        User.create(
          {
            email: params.email,
            phoneNumber: params.phoneNumber,
            firstName: params.firstName,
            lastName: params.lastName,
            birthDate: params.birthDate,
            gender: params.gender
          },
          (err, res) => {
            if (err) {
              throw err;
            } else {
              resolve(res ? false : true);
            }
          }
        );
      });

      return { success: instantiate };
    } catch (e) {
      throw e.message;
    }
  };

  // ================================================================
  //              registrationData
  // ================================================================
  AuthService.remoteMethod("registrationData", {
    accepts: [],
    returns: {
      arg: "data",
      type: "object",
      root: true
    },
    http: {
      path: "/registrationData",
      verb: "get"
    }
  });

  AuthService.registrationData = async params => {
    try {
      const User = app.models.User;
      const list = await new Promise(resolve => {
        User.find({}, (err, res) => {
          if (err) {
            throw err;
          } else {
            resolve(res);
          }
        });
      });

      return list;
    } catch (e) {
      throw e.message;
    }
  };
};
