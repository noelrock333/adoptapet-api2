var express = require('express');
var router = express.Router();
const User = require('../models/usuario');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const users_list = await User.find();
  res.render('users/list', {
    users: users_list
  });
});

router.get('/create', (req, res) => {
  res.render('users/create');
});

router.post('/create', async (req, res) => {
  try {
    const new_user = new User({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    })
    await new_user.save();
    res.redirect('/users');
  } catch (error) {
    res.send(error);
  }
})

router.get('/update/:id', async (req, res) => {
  try {
    const current_user = await User.findOne({ _id: req.params.id })
    res.render('users/update', {
      user: current_user
    });
  } catch (error) {
    res.send('Usuario no encontrado')
  }
})

router.post('/update/:id', async (req, res) => {
  try {
    await User.findOneAndUpdate({ _id: req.params.id }, {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    })
    res.redirect('/users')
  } catch (error) {
    res.send('Ocurrió un error al intentar actualizar')
  }
})

router.get('/show/:id', async (req, res) => {
  try {
    const current_user = await User.findOne({ _id: req.params.id })
    res.render('users/show', { user: current_user })
  } catch (error) {
    res.send('El usuario no existe')
  }
})

router.get('/delete/:id', async (req, res) => {
  try {
    await User.findOneAndRemove({ _id: req.params.id })
    res.redirect('/users')
  } catch (error) {
    res.send('No se pudo eliminar el usuario')
  }
})

module.exports = router;
