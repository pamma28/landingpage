"use strict";

module.exports = function(User) {
  User.validatesUniquenessOf("email");
  User.validatesUniquenessOf("phoneNumber");
};
