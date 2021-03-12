var express = require('express');
var router = express.Router();
var knexFile = require('../knexfile');
var knex = require('knex')(knexFile['development'])

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express', edad: 31, nombre: 'Noel Escobedo' });
  // res.json({ title: 'Express', edad: 31, nombre: 'Noel Escobedo' });
  // res.send('Hola mundo')
  res.send(req.query.miVariable)
});

router.post('/', function(req, res) {
  res.send(req.body.nombre)
});

router.get('/v1/mascotas/:id', async (req, res) => {
  const mascota = await knex.select('*').from('mascotas').where('id', req.params.id).first()
  res.render('mascota', mascota)
});

router.post('/v1/mascotas', async (req, res) => {
  // await knex('mascotas').insert({ nombre: 'Fido', ubicacion: 'CDMX', foto: '' })
  await knex('mascotas').insert(req.body)
  res.end()
})

module.exports = router;
