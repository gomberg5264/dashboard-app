var express = require('express');
var router = express.Router();
var models = require('../db/models/index');

router.get('/list', (req, res) => {
  models.Todo.findAll({ where: { user_id: req.user.dataValues.id  } })
  .then(function(todos) {
    res.json({ list: todos});
    // console.log(res);
  });
});

router.post('/new', (req, res) => {
  models.Todo.create({
    title: req.body.data,
    user_id: req.user.dataValues.id,
  })
  .then(function() {
    res.json({ success: true })
  });
});

router.post('/delete', (req, res) => {
  models.Todo.destroy({
    where: { user_id: req.user.dataValues.id, id: req.body.id }
  })
  .then(function() {
    res.json({ success: true })
  });
});

router.post('/update', (req, res) => {
  models.Todo.update({
    title: req.body.newTitle,
  }, { where: { user_id: req.user.dataValues.id, id: req.body.id } })
  .then(function() {
    res.json({ success: true })
  });
});

module.exports = router;
