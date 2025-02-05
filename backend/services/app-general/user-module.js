"use strict";

const { AgUserModule } = require("models");
const { serviceHelpers } = require("helpers");

module.exports = serviceHelpers.createBasicServices(AgUserModule);
