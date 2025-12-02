const { Router } = require('express');
const {
  createLibro,
  readLibro,
  updateLibro,
  deleteLibro,
} = require('../controllers/user.controllers2');

const router = Router();

router.get('/:id', readLibro);

router.post('/', createLibro);

router.put('/:id', updateLibro);

router.delete('/:id', deleteLibro);

module.exports = router;