// index.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Carga las variables de entorno

const app = express();
const port = 8080;

// Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch(err => console.error('Error al conectar a MongoDB Atlas', err));

// Importar el modelo de inventario
const Inventory = require('./models/Inventory');

app.use(express.json());

// Ruta básica para verificar el servidor
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente. Accede a /inventory para ver el inventario.');
});

// Endpoint para obtener todas las películas
app.get('/inventory', async (req, res) => {
  try {
    const items = await Inventory.find();
    res.json(items);
  } catch (err) {
    res.status(500).send('Error al obtener el inventario');
  }
});

// Endpoint para crear una nueva película
app.post('/inventory', async (req, res) => {
  const { title, director, releaseDate, genre, rating } = req.body;
  try {
    const newItem = new Inventory({ title, director, releaseDate, genre, rating });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).send('Error al crear la película');
  }
});

// Endpoint para eliminar una película por ID
app.delete('/inventory/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Inventory.findByIdAndDelete(id);
    if (result) {
      res.status(200).send('Película eliminada');
    } else {
      res.status(404).send('Película no encontrada');
    }
  } catch (err) {
    console.error('Error al eliminar la película:', err); // Agregado para depuración
    res.status(500).send('Error al eliminar la película');
  }
});

// Endpoint para actualizar una película por ID (opcional)
app.put('/inventory/:id', async (req, res) => {
  const { id } = req.params;
  const { title, director, releaseDate, genre, rating } = req.body;
  try {
    const updatedItem = await Inventory.findByIdAndUpdate(id, { title, director, releaseDate, genre, rating }, { new: true });
    if (updatedItem) {
      res.status(200).json(updatedItem);
    } else {
      res.status(404).send('Película no encontrada');
    }
  } catch (err) {
    res.status(400).send('Error al actualizar la película');
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});