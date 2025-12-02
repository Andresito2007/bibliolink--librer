const { Router } = require('express');
const {
  createReserva,
  readReserva,
  listReservas,
  updateReserva,
  deleteReserva,
} = require('../controllers/user.controllers3');

const router = Router();

// Listar todas las reservas
router.get('/', listReservas);

// Buscar reserva por ID
router.get('/:id', readReserva);

// Crear nueva reserva
router.post('/', createReserva);

// Actualizar reserva
router.put('/:id', updateReserva);

// Cancelar/eliminar reserva
router.delete('/:id', deleteReserva);

module.exports = router;