import ReservationForm from '../components/ReservationForm';
import ReservationList from '../components/ReservationList';
import "../styles/reservations.css";

export default function Reservations() {
  return (
    <div>
      <h1>Gestión de Reservas</h1>
      <ReservationForm />
      <hr />
      <ReservationList />
    </div>
  );
}
