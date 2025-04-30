const Reservation = require('../models/Reservation');
const ReservationFactory = require('../factories/ReservationFactory');

// Crear reserva
exports.createReservation = async (req, res) => {
  try {
    const { name, email, date, time, people } = req.body;

    if (!name || !email || !date || !time || !people) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const reservation = ReservationFactory.create(req.body);
    await reservation.save();

    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener todas las reservas
exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Eliminar reserva por ID
exports.deleteReservation = async (req, res) => {
  try {
    const deleted = await Reservation.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }
    res.json({ message: 'Reserva eliminada' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
