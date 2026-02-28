const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();

app.use("/kucoin-futures", createProxyMiddleware({
  target: "https://api-futures.kucoin.com",
  changeOrigin: true,
  pathRewrite: { "^/kucoin-futures": "" },
}));

app.use("/kucoin", createProxyMiddleware({
  target: "https://api.kucoin.com",
  changeOrigin: true,
  pathRewrite: { "^/kucoin": "" },
}));

app.get("/health", (req, res) => res.json({ status: "ok" }));
app.listen(process.env.PORT || 3001);
