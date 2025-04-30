const Reservation = require('../models/Reservation');

class ReservationFactory {
  static create(data) {
    return new Reservation({
      name: data.name,
      email: data.email,
      date: data.date,
      time: data.time,
      people: data.people,
    });
  }
}

module.exports = ReservationFactory;
