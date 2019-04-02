export function curryN(length, fn) {
  function curryFn(...args) {
    if (args.length > length) {
      throw new Error("Too many arguments");
    } else if (args.length < length) {
      return curryN(length - args.length, (..._args) =>
        fn(...[...args, ..._args]),
      );
    } else {
      return fn(...args);
    }
  }
  return curryFn;
}

export function length(x) {
  return x.length;
}

export function trace(x) {
  console.log(x);
  return x;
}

export function mapAsPairs(fn, x) {
  return pipe(x, toPairs, y => y.map(fn), fromPairs);
}

export function difference(xs, ys) {
  return xs.filter(x => !ys.includes(x));
}

export const pipe = (first, ...rest) => {
  return rest.reduce((acc, fn) => fn(acc), first);
};

export const piper = (...rest) => first => {
  return pipe(first, ...rest);
};

export function fromPairs(xs) {
  return xs.reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {});
}

export function toPairs(x) {
  return Object.keys(x).reduce((acc, key) => [...acc, [key, x[key]]], []);
}

export function all(fn, xs) {
  return xs.reduce((acc, x) => acc && fn(x));
}
