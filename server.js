const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();

app.use("/kucoin", createProxyMiddleware({
  target: "https://api.kucoin.com",
  changeOrigin: true,
  pathRewrite: { "^/kucoin": "" },
}));

app.get("/health", (req, res) => res.json({ status: "ok" }));
app.listen(process.env.PORT || 3001);
