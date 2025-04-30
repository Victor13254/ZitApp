const Reservation = require('../models/Reservation');
const ReservationFactory = require('../factories/ReservationFactory');

exports.createReservation = async (req, res) => {
  try {
    const reservation = ReservationFactory.create(req.body);
    await reservation.save();
    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getReservations = async (req, res) => {
  const reservations = await Reservation.find();
  res.json(reservations);
};

exports.deleteReservation = async (req, res) => {
  await Reservation.findByIdAndDelete(req.params.id);
  res.json({ message: 'Reserva eliminada' });
};
