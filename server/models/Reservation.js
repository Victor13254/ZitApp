const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: String,
  time: String,
  people: Number,
});

module.exports = mongoose.model('Reservation', reservationSchema);
