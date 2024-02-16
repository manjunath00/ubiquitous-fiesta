var express = require('express');
var router = express.Router();
const axios = require('axios');

const url = 'https://jsonplaceholder.typicode.com/posts'

/* GET users listing. */
router.get('/', async function(req, res) {
  const result = await axios.get(url);
  
  const data = result?.data
  res.json(data)
});

router.get('/:id', async function(req, res) {
  const result = await axios.get(url);
  const id = req.params.id;
  const data = result?.data.filter(item => item.id == id)
  res.json(data)
});


module.exports = router;
