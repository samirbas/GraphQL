const express = require('express');
const app = express();
const path = require('path');

// Définir les routes pour les fichiers statiques
app.use(express.static(path.join(__dirname, 'template')));

// Route pour la page principale

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'template', 'index.html'));
});

// Autres routes
app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'template', 'index.html'));
});

app.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname, 'template', 'test.html'));
});


app.get('/graphe', (req, res) => {
  res.sendFile(path.join(__dirname, 'template', 'index.html'));
});

app.get('/deco', (req, res) => {
  res.sendFile(path.join(__dirname, 'template', 'index.html'));
});

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'template', '404.html'));
});

// Démarrer le serveur
const port = 8080; // ou tout autre port de votre choix
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
