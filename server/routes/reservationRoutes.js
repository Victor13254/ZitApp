const express = require('express');
const router = express.Router();
const controller = require('../controllers/reservationController');

router.post('/', controller.createReservation);
router.get('/', controller.getReservations);
router.delete('/:id', controller.deleteReservation);

module.exports = router;
