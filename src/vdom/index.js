import { toPairs } from "../prelude";

export function doctype(props) {
  return `<!doctype${propsToString(props)}>`;
}

export function meta(props) {
  return `<meta${propsToString(props)} />`;
}

export function title(props, children) {
  return `<title${propsToString(props)}>${children.join("")}</title>`;
}

export function head(props, children) {
  return `<head${propsToString(props)}>${children.join("")}</head>`;
}

export function div(props, children) {
  return `<div${propsToString(props)}>${children.join("")}</div>`;
}

export function body(props, children) {
  return `<body${propsToString(props)}>${children.join("")}</body>`;
}

export function html(props, children) {
  return `<html${propsToString(props)}>${children.join("")}</html>`;
}

export function renderToHTML(vdom) {
  return vdom.join("");
}

function propsToString(props) {
  const propPairs = toPairs(props);
  return propPairs.length > 0
    ? " " +
      propPairs
        .reduce((acc, [key, val]) => [...acc, propToString(key, val)], [])
        .join(" ")
    : "";
}

function propToString(key, val) {
  if (typeof val === "string") {
    return `${key}="${val}"`;
  } else {
    return key;
  }
}
