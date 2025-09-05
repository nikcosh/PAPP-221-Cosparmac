const express = require('express');
const router = express.Router();

// lista cartilor
const carti = [
  { id: 1, titlu: "Carte 1", autor: "Autor 1" },
  { id: 2, titlu: "Carte 2", autor: "Autor 2" },
  { id: 3, titlu: "Carte 3", autor: "Autor 3" },
  { id: 4, titlu: "Carte 4", autor: "Autor 4" },
  { id: 5, titlu: "Carte 5", autor: "Autor 5" },
  { id: 6, titlu: "Carte 6", autor: "Autor 6" },
  { id: 7, titlu: "Carte 7", autor: "Autor 7" },
  { id: 8, titlu: "Carte 8", autor: "Autor 8" },
  { id: 9, titlu: "Carte 9", autor: "Autor 9" },
  { id: 10, titlu: "Carte 10", autor: "Autor 10" }
];

// GET /list
router.get('/list', (req, res) => res.json(carti));

// GET /details/:id
router.get('/details/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const carte = carti.find(c => c.id === id);
  if (!carte) return res.status(404).json({ mesaj: "Cartea nu a fost gasita" });
  res.json(carte);
});

// GET /search
router.get('/search', (req, res) => {
  const { name, minId, maxId } = req.query;
  let rezultate = carti;
  if (name) rezultate = rezultate.filter(c => c.titlu.toLowerCase().includes(name.toLowerCase()));
  if (minId) rezultate = rezultate.filter(c => c.id >= parseInt(minId));
  if (maxId) rezultate = rezultate.filter(c => c.id <= parseInt(maxId));
  res.json(rezultate);
});

// GET /public/list
router.get('/public/list', (req, res) => {
  res.json(carti.map(c => ({ id: c.id, titlu: c.titlu })));
});

// POST /admin/edit/:id
router.post('/admin/edit/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const carte = carti.find(c => c.id === id);
  if (!carte) return res.status(404).json({ mesaj: "Cartea nu exista" });
  carte.titlu = req.body.titlu || carte.titlu;
  carte.autor = req.body.autor || carte.autor;
  res.json({ mesaj: "Cartea a fost actualizata", carte });
});

// Middleware roluri
function verificaRol(rol) {
  return (req, res, next) => {
    const rolUtilizator = req.headers['x-rol'];
    if (rolUtilizator !== rol) return res.status(403).json({ mesaj: "Acces interzis" });
    next();
  };
}

// GET /admin/raport
router.get('/admin/raport', verificaRol('Admin'), (req, res) => {
  res.json({ raport: "Raport secret" });
});

module.exports = router;
