"use strict";

const { AgUser } = require("models");
const { serviceHelper } = require("helpers");

module.exports = serviceHelper.createBasicService(AgUser);
