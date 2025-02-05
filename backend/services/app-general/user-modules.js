"use strict";

const { AgUserModule } = require("models");
const { serviceHelper } = require("helpers");

module.exports = serviceHelper.createBasicService(AgUserModule);
