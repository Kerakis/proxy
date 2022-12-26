const express = require('express');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');

// Create Express Server
const app = express();

// Configuration
const PORT = 3000;
const HOST = 'localhost';
const API_SERVICE_URL = 'https://api2.moxfield.com/v2/';

// Logging
app.use(morgan('dev'));

// // Authorization
// app.use('', (req, res, next) => {
//   if (req.headers.authorization) {
//     next();
//   } else {
//     res.sendStatus(403);
//   }
// });

// Proxy endpoints
app.use(
  '/decks/all/',
  createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    headers: {
      // compress, gzip, and deflate all result in 501 Not Implemented errors.
      'transfer-encoding': 'chunked',
    },
  })
);

// Start the Proxy
app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});

module.exports = app;
