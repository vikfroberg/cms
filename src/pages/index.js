import { div } from "../vdom";

export function pageTitle(name) {
  return name + "'s website";
}

export function view(name) {
  return div({}, ["Hello, my name is ", name, "!"]);
}
