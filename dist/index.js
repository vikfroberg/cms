"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _vdom = require("./vdom");

var _index = require("./pages/index");

var Home = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = (0, _express2.default)();

function render(pageTitle, view, props) {
  return (0, _vdom.renderToHTML)([(0, _vdom.doctype)({ html: true }), (0, _vdom.html)({ lang: "en" }, [(0, _vdom.head)({}, [(0, _vdom.meta)({ charset: "utf-8" }), (0, _vdom.title)({}, [pageTitle(props)])]), (0, _vdom.body)({}, [view(props)])])]);
}

server.get("/", function (req, res) {
  return res.send(render(Home.pageTitle, Home.view, "Viktor"));
});

server.listen(3000, function () {
  return console.log("Example app listening on port 3000!");
});