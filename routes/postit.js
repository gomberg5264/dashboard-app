var express = require('express');
var router = express.Router();
var models = require('../db/models/index');

module.exports = router;

// get the list of postits from the database and passed it onto React Component
router.get('/list', (req, res) => {
  models.Postit.findAll({ where: { user_id: req.user.dataValues.id  } })
  .then(function(notes) {
    res.json({ list: notes});
    // console.log(res);
  });
});

router.post('/new', (req, res) => {
  models.Postit.create({
    note: req.body.data,
    user_id: req.user.dataValues.id,
  })
  .then(function() {
    res.json({ success: true })
  });
});

router.post('/delete', (req, res) => {
  models.Postit.destroy({
    where: { user_id: req.user.dataValues.id, id: req.body.id }
  })
  .then(function() {
    res.json({ success: true })
  });
});
