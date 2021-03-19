var express = require('express');
var router = express.Router();
var knexFile = require('../knexfile');
var knex = require('knex')(knexFile['development'])

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express', edad: 31, nombre: 'Noel Escobedo' });
  // res.json({ title: 'Express', edad: 31, nombre: 'Noel Escobedo' });
  res.send('Hola mundo')
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
  res.render('mascotas/success')
})

router.post('/v1/mascotas/update/:id', async (req, res) => {
  await knex('mascotas')
    .where('id', req.params.id)
    .update({
      nombre: req.body.nombre,
      foto: req.body.foto,
      ubicacion: req.body.ubicacion,
    })
  res.redirect('/mascotas')
})

router.get('/mascotas/create_form', (req, res) => {
  res.render('mascotas/create')
})

router.get('/mascotas', async (req, res) => {
  const mascotas = await knex.select('*').from('mascotas')
  res.render('mascotas/list', { mascotas: mascotas })
})

router.get('/mascotas/update/:id', async (req, res) => {
  const idMascota = req.params.id
  const mascota = await knex.select('*').from('mascotas').where('id', idMascota).first()
  res.render('mascotas/update', { mascota: mascota })
})

router.get('/mascotas/show/:id', async (req, res) => {
  const idMascota = req.params.id
  const mascota = await knex.select('*').from('mascotas').where('id', idMascota).first()
  res.render('mascotas/show', { mascota: mascota })
})

router.get('/mascotas/delete/:id', async (req, res) => {
  const idMascota = req.params.id
  await knex('mascotas').where('id', idMascota).del()
  res.redirect('/mascotas')
})

module.exports = router;
