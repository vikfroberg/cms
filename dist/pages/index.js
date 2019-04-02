"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pageTitle = pageTitle;
exports.view = view;

var _vdom = require("../vdom");

function pageTitle(name) {
  return name + "'s website";
}

function view(name) {
  return (0, _vdom.div)({}, ["Hello, my name is ", name, "!"]);
}