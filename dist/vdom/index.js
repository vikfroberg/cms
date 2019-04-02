"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.doctype = doctype;
exports.meta = meta;
exports.title = title;
exports.head = head;
exports.div = div;
exports.body = body;
exports.html = html;
exports.renderToHTML = renderToHTML;

var _prelude = require("../prelude");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function doctype(props) {
  return "<!doctype" + propsToString(props) + ">";
}

function meta(props) {
  return "<meta" + propsToString(props) + " />";
}

function title(props, children) {
  return "<title" + propsToString(props) + ">" + children.join("") + "</title>";
}

function head(props, children) {
  return "<head" + propsToString(props) + ">" + children.join("") + "</head>";
}

function div(props, children) {
  return "<div" + propsToString(props) + ">" + children.join("") + "</div>";
}

function body(props, children) {
  return "<body" + propsToString(props) + ">" + children.join("") + "</body>";
}

function html(props, children) {
  return "<html" + propsToString(props) + ">" + children.join("") + "</html>";
}

function renderToHTML(vdom) {
  return vdom.join("");
}

function propsToString(props) {
  var propPairs = (0, _prelude.toPairs)(props);
  return propPairs.length > 0 ? " " + propPairs.reduce(function (acc, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        val = _ref2[1];

    return [].concat(_toConsumableArray(acc), [propToString(key, val)]);
  }, []).join(" ") : "";
}

function propToString(key, val) {
  if (typeof val === "string") {
    return key + "=\"" + val + "\"";
  } else {
    return key;
  }
}