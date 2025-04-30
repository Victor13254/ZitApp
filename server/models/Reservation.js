const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  people: { type: Number, required: true }
});

module.exports = mongoose.model('Reservation', reservationSchema);
