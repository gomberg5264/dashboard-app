var express = require('express');
var router = express.Router();
var models = require('../db/models/index');
var user_id = null;

router.get('/list', (req, res) => {
  models.Todo.findAll({ where: { user_id: user_id } })
  .then(function(res) {
    // res.json({ list: todos});
    console.log(res);
  });
});

router.post('/new', (req, res) => {
  models.Todo.create({
    title: req.body.data,
    user_id: req.user.dataValues.id,
  });
});

module.exports = router;
