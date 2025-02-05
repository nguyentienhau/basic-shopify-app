"use strict";

const { RqLog } = require("models");
const { serviceHelpers } = require("helpers");

module.exports = serviceHelpers.createBasicServices(RqLog);
