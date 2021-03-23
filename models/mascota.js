const mongoose = require('mongoose');

const schema = mongoose.Schema({
	nombre: String,
  foto: String,
	ubicacion: String,
})

module.exports = mongoose.model('Mascota', schema)