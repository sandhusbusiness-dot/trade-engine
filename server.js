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

// Binance Spot/SAPI proxy (ADD THIS)
app.use("/binance-spot", createProxyMiddleware({
    target: "https://api.binance.com",
    changeOrigin: true,
    pathRewrite: { "^/binance-spot": "" },
}));


app.use("/kraken", createProxyMiddleware({
    target: "https://futures.kraken.com",
    changeOrigin: true,
    pathRewrite: { "^/kraken": "/derivatives/api" },
}));


// Bitget proxy
app.use("/bitget", createProxyMiddleware({
  target: "https://api.bitget.com",
  changeOrigin: true,
  pathRewrite: { "^/bitget": "" },
}));

app.use("/blofin", (req, res, next) => {
  console.log("BLOFIN HIT", req.method, req.originalUrl);
  next();
}, createProxyMiddleware({
  target: "https://openapi.blofin.com",
  changeOrigin: true,
}));


app.get("/health", (req, res) => res.json({ status: "ok" }));
app.listen(process.env.PORT || 3001);

