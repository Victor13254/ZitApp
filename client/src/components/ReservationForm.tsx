import { useState } from 'react';

export default function ReservationForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    people: 1
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    alert('Reserva creada');
    setForm({ name: '', email: '', date: '', time: '', people: 1 });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Nombre" onChange={handleChange} value={form.name} />
      <input name="email" placeholder="Correo" onChange={handleChange} value={form.email} />
      <input name="date" type="date" onChange={handleChange} value={form.date} />
      <input name="time" type="time" onChange={handleChange} value={form.time} />
      <input name="people" type="number" onChange={handleChange} value={form.people} />
      <button type="submit">Reservar</button>
    </form>
  );
}
