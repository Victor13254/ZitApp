const express = require('express');
const router = express.Router();
const {
  createReservation,
  getReservations,
  deleteReservation // Asegúrate de que este nombre coincide con el del controller
} = require('../controllers/reservationController');

router.post('/', createReservation);
router.get('/', getReservations);
router.delete('/:id', deleteReservation);

module.exports = router;

