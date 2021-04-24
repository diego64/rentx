"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _default = async (localhost = "database") => {
  const defaultOPtions = await (0, _typeorm.getConnectionOptions)();
  return (0, _typeorm.createConnection)(Object.assign(defaultOPtions, {
    localhost: process.env.NODE_ENV === "test" ? "localhost" : localhost,
    database: process.env.NODE_ENV === "test" ? "rentx_test" : defaultOPtions.database
  }));
};

exports.default = _default;