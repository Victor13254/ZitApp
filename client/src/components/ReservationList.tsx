import { useEffect, useState } from 'react';

type Reservation = {
  _id: string;
  name: string;
  email: string;
  date: string;
  time: string;
  people: number;
};

export default function ReservationList() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const fetchReservations = async () => {
    const res = await fetch('http://localhost:5000/api/reservations');
    const data = await res.json();
    setReservations(data);
  };

  const cancelReservation = async (id: string) => {
    await fetch(`http://localhost:5000/api/reservations/${id}`, { method: 'DELETE' });
    fetchReservations();
  };

  useEffect(() => { fetchReservations(); }, []);

  return (
    <div>
      <h2>Reservas</h2>
      <ul>
        {reservations.map((r) => (
          <li key={r._id}>
            {r.name} - {r.date} {r.time} ({r.people} personas)
            <button onClick={() => cancelReservation(r._id)}>Cancelar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
