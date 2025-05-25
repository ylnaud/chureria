const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Configurar middleware de seguridad básico
app.use((req, res, next) => {
  // Modificar política de seguridad para desarrollo
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self';" +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;" +
    "font-src 'self' https://fonts.gstatic.com data:;" +
    "img-src 'self' data:;"
  );
  next();
});

// Servir archivos estáticos desde la carpeta _site
app.use(express.static(path.join(__dirname, '../_site')));

// Manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../_site/404.html'));
});

app.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost:${port}`);
});