"use strict";

const { AgUser } = require("models");
const { serviceHelpers } = require("helpers");

module.exports = serviceHelpers.createBasicServices(AgUser);
