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

// Bybit proxy
app.use("/bybit", createProxyMiddleware({
    target: "https://api.bybit.com",
    changeOrigin: true,
    pathRewrite: { "^/bybit": "" },
}));

// Binance Futures proxy
app.use("/binance", createProxyMiddleware({
    target: "https://fapi.binance.com",
    changeOrigin: true,
    pathRewrite: { "^/binance": "" },
}));

app.use("/kraken", createProxyMiddleware({
    target: "https://futures.kraken.com",
    changeOrigin: true,
    pathRewrite: { "^/kraken": "" },
}));


app.get("/health", (req, res) => res.json({ status: "ok" }));
app.listen(process.env.PORT || 3001);
