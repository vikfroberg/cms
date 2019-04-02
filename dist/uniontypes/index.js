"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.list = exports.object = exports.string = exports.float = exports.int = exports.id = exports.toString = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.define = define;

var _helpers = require("./helpers");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var toString = exports.toString = function toString(x) {
  if (x.__burk) {
    if (x.args.length) {
      return x.name + "." + x.kind + "(" + x.args.map(toString).join(", ") + ")";
    } else {
      return x.name + "." + x.kind;
    }
  } else {
    if (x != null && Array.isArray(x)) {
      return x.map(toString);
    } else if (x != null && (typeof x === "undefined" ? "undefined" : _typeof(x)) === "object") {
      return Object.keys(x).reduce(function (acc, key) {
        return _extends({}, acc, _defineProperty({}, key, toString(x[key])));
      }, {});
    } else {
      return x.toString();
    }
  }
};

function define(name, definitions) {
  var constructors = (0, _helpers.mapAsPairs)(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        kind = _ref2[0],
        guards = _ref2[1];

    var fnOrObj = guards.length > 0 ? (0, _helpers.curryN)(guards.length, function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return {
        __burk: true,
        name: name,
        kind: kind,
        args: args.map(function (x, i) {
          return guards[i](x);
        })
      };
    }) : { __burk: true, name: name, kind: kind, args: [] };

    return [kind, fnOrObj];
  }, definitions);

  return _extends({}, constructors, {
    id: function id(x) {
      if (x.name === name) {
        return x;
      } else {
        throw new TypeError(toString(x) + "is not of type " + name);
      }
    },
    fold: (0, _helpers.curryN)(2, function fold(cases, x) {
      var defKeys = Object.keys(definitions);
      var caseKeys = Object.keys(cases);

      if (name !== x.name) {
        throw new Error("'" + name + ".fold' received the wrong type");
      } else if (caseKeys.includes("_")) {
        var unknownKeys = (0, _helpers.difference)(caseKeys, [].concat(_toConsumableArray(defKeys), ["_"]));
        if (unknownKeys.length > 0) {
          throw new Error("'" + name + ".fold' contains unknown cases '" + unknownKeys.join(", ") + "'");
        }
        return caseKeys.includes(x.kind) ? cases[x.kind].apply(cases, _toConsumableArray(x.args)) : cases["_"]();
      } else {
        var missingKeys = (0, _helpers.difference)(defKeys, caseKeys);
        if (missingKeys.length > 0) {
          throw new Error("'" + name + ".fold' is missing cases '" + missingKeys.join(", ") + "'");
        }
        var _unknownKeys = (0, _helpers.difference)(caseKeys, defKeys);
        if (_unknownKeys.length > 0) {
          throw new Error("'" + name + ".fold' contains unknown cases '" + _unknownKeys.join(", ") + "'");
        }
        return cases[x.kind].apply(cases, _toConsumableArray(x.args));
      }
    })
  });
}

var isObject = function isObject(x) {
  if (x == null || (typeof x === "undefined" ? "undefined" : _typeof(x)) !== "object") {
    throw new TypeError(x + " is not an object");
  } else {
    return x;
  }
};

var isArray = function isArray(x) {
  if (x == null || !Array.isArray(x)) {
    throw new TypeError(x + " is not an array");
  } else {
    return x;
  }
};

var notNull = function notNull(x) {
  if (x == null) {
    throw new TypeError(x + " can not be null");
  } else {
    return x;
  }
};

var id = exports.id = function id(x) {
  return x;
};

var int = exports.int = function int(x) {
  if (Number(x) === x && x % 1 === 0) {
    return x;
  } else {
    throw new TypeError(x + " is not an int");
  }
};

var float = exports.float = function float(x) {
  if (Number(x) === x && x % 1 !== 0) {
    return x;
  } else {
    throw new TypeError(x + " is not a float");
  }
};

var string = exports.string = function string(x) {
  if (typeof x !== "string") {
    throw new TypeError(x + " is not a string");
  } else {
    return x;
  }
};

var object = exports.object = function object(x) {
  return function (y) {
    var safeY = isObject(notNull(y));
    var xKeys = Object.keys(x);
    return xKeys.reduce(function (acc, key) {
      try {
        return _extends({}, acc, _defineProperty({}, key, x[key](safeY[key])));
      } catch (e) {
        throw new TypeError("{ " + key + ": '" + e.message + "', ... }");
      }
    }, {});
  };
};

var list = exports.list = function list(x) {
  return function (y) {
    var safeY = isArray(notNull(y));
    return safeY.reduce(function (acc, val) {
      try {
        return [].concat(_toConsumableArray(acc), [x(val)]);
      } catch (e) {
        throw new TypeError("['" + e.message + "', ...]");
      }
    }, []);
  };
};