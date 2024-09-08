const express = require('express');
const Genero = require('../models/Genero');
const router = express.Router();

router.get('/', async (req, res) => {
  const generos = await Genero.find();
  res.send(generos);
});

router.post('/', async (req, res) => {
  let genero = new Genero(req.body);
  genero = await genero.save();
  res.send(genero);
});

router.put('/:id', async (req, res) => {
  const genero = await Genero.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(genero);
});

router.delete('/:id', async (req, res) => {
  const genero = await Genero.findByIdAndRemove(req.params.id);
  res.send(genero);
});

module.exports = router;
