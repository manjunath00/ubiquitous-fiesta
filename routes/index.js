var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ title: 'Express' });
});

router.get('/books', function (req, res, next) {
  res.send({ message: 'success', books: []})
})

module.exports = router;
