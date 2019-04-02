import express from "express";
import { doctype, title, head, meta, html, body, renderToHTML } from "./vdom";
import * as Home from "./pages/index";

const server = express();

function render(pageTitle, view, props) {
  return renderToHTML([
    doctype({ html: true }),
    html({ lang: "en" }, [
      head({}, [meta({ charset: "utf-8" }), title({}, [pageTitle(props)])]),
      body({}, [view(props)]),
    ]),
  ]);
}

server.get("/", (req, res) =>
  res.send(render(Home.pageTitle, Home.view, "Viktor")),
);

server.listen(3000, () => console.log("Example app listening on port 3000!"));
