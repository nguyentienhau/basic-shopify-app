"use strict";

const { RqLog } = require("models");
const { serviceHelper } = require("helpers");

module.exports = serviceHelper.createBasicService(RqLog);
