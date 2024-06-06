const express = require('express');
const router = require('./router');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json({ limit: '50mb' }));

app.use(router);

const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir);
}

// Servir arquivos estáticos
app.use('/images', express.static(imagesDir));

module.exports = app;
