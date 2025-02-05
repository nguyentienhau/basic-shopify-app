"use strict";

const { RqOrder } = require("models");
const { serviceHelper } = require("helpers");

module.exports = serviceHelper.createBasicService(RqOrder);
