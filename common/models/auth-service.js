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
        throw new Error("phone number is not a number");
      }

      let subNumber = phoneNumber.substr(0, 2);
      if (
        new String(subNumber).valueOf() === new String("08").valueOf() ||
        new String(subNumber).valueOf() === new String("62").valueOf()
      ) {
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

        if (!valid) {
          throw new Error("phone number is already registered");
        }
        return { valid: valid };
      } else {
        throw new Error("phone number format is invalid, use 08 or 62");
      }
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
        throw new Error("email invalid or not a string");
      }

      // check email regex
      let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!regex.test(email)) {
        throw new Error("your email format is invalid.");
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

      if (!valid) {
        throw new Error("email is already registered");
      }

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
            gender: params.gender,
            createdAt: new Date()
          },
          (err, res) => {
            if (err) {
              throw err;
            } else {
              resolve(res ? true : false);
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
