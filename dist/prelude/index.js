"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.curryN = curryN;
exports.length = length;
exports.trace = trace;
exports.mapAsPairs = mapAsPairs;
exports.difference = difference;
exports.fromPairs = fromPairs;
exports.toPairs = toPairs;
exports.all = all;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function curryN(length, fn) {
  function curryFn() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args.length > length) {
      throw new Error("Too many arguments");
    } else if (args.length < length) {
      return curryN(length - args.length, function () {
        for (var _len2 = arguments.length, _args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          _args[_key2] = arguments[_key2];
        }

        return fn.apply(undefined, [].concat(args, _args));
      });
    } else {
      return fn.apply(undefined, args);
    }
  }
  return curryFn;
}

function length(x) {
  return x.length;
}

function trace(x) {
  console.log(x);
  return x;
}

function mapAsPairs(fn, x) {
  return pipe(x, toPairs, function (y) {
    return y.map(fn);
  }, fromPairs);
}

function difference(xs, ys) {
  return xs.filter(function (x) {
    return !ys.includes(x);
  });
}

var pipe = exports.pipe = function pipe(first) {
  for (var _len3 = arguments.length, rest = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    rest[_key3 - 1] = arguments[_key3];
  }

  return rest.reduce(function (acc, fn) {
    return fn(acc);
  }, first);
};

var piper = exports.piper = function piper() {
  for (var _len4 = arguments.length, rest = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    rest[_key4] = arguments[_key4];
  }

  return function (first) {
    return pipe.apply(undefined, [first].concat(rest));
  };
};

function fromPairs(xs) {
  return xs.reduce(function (acc, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        val = _ref2[1];

    return _extends({}, acc, _defineProperty({}, key, val));
  }, {});
}

function toPairs(x) {
  return Object.keys(x).reduce(function (acc, key) {
    return [].concat(_toConsumableArray(acc), [[key, x[key]]]);
  }, []);
}

function all(fn, xs) {
  return xs.reduce(function (acc, x) {
    return acc && fn(x);
  });
}