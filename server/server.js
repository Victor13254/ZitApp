const express = require('express');
const cors = require('cors');
const reservationRoutes = require('./routes/reservations');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const { MongoClient, ServerApiVersion } = require('mongodb');

dotenv.config();
const app = express();
const port = 5000; 

app.use(cors());
app.use(express.json());
app.use('/api/reservations', reservationRoutes);

const uri = "mongodb+srv://victorcespedes0710:bbEDVgV4CDqvncHL@cluster0.toxvfcr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.get('/', (req, res) => {
  res.send('API de ZitApp funcionando correctamente.');
});

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get('/ping', async (req, res) => {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    res.status(200).send("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    res.status(500).send("Error connecting to MongoDB");
  } finally {
    await client.close();
  }
});

app.post('/register-client', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    await client.connect();
    const db = client.db("ZitApp"); // Base de datos "ZitApp"
    const collection = db.collection("clients"); // Colección de clientes

    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);
    // Insertar un nuevo cliente en la base de datos con la contraseña encriptada
    const result = await collection.insertOne({ username, email, password: hashedPassword });


    res.status(201).json({ message: 'Cliente registrado exitosamente', result });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar cliente', error });
  } finally {
    await client.close();
  }
});

// Ruta para hacer login de un cliente
// server.js (Backend)
app.post('/login-client', async (req, res) => {
  const { identifier, password } = req.body;
  try {
    await client.connect();
    const db = client.db("ZitApp"); // Base de datos "ZitApp"
    const collection = db.collection("clients"); // Colección de clientes

    // Buscar si el email o el username existe en la base de datos
    const user = await collection.findOne({
      $or: [
        { email: identifier }, // Si el identificador es un email
        { username: identifier }, // Si el identificador es un username
      ],
    });

    if (!user) {
      return res.status(400).json({ message: 'Usuario o correo electrónico no encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Si todo es correcto, devolver respuesta de éxito
    res.status(200).json({ message: 'Login exitoso', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al intentar hacer login', error });
  } finally {
    await client.close();
  }
});


app.post('/register-admin', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    await client.connect();
    const db = client.db("ZitApp"); // Base de datos "ZitApp"
    const collection = db.collection("admins"); // Colección de clientes

    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);
    // Insertar un nuevo cliente en la base de datos con la contraseña encriptada
    const result = await collection.insertOne({ username, email, password: hashedPassword });


    res.status(201).json({ message: 'Cliente registrado exitosamente', result });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar cliente', error });
  } finally {
    await client.close();
  }
});

// Ruta para hacer login de un cliente
// server.js (Backend)
app.post('/login-admin', async (req, res) => {
  const { identifier, password } = req.body;
  try {
    await client.connect();
    const db = client.db("ZitApp"); // Base de datos "ZitApp"
    const collection = db.collection("admins"); // Colección de clientes

    // Buscar si el email o el username existe en la base de datos
    const user = await collection.findOne({
      $or: [
        { email: identifier }, // Si el identificador es un email
        { username: identifier }, // Si el identificador es un username
      ],
    });

    if (!user) {
      return res.status(400).json({ message: 'Usuario o correo electrónico no encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Si todo es correcto, devolver respuesta de éxito
    res.status(200).json({ message: 'Login exitoso', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al intentar hacer login', error });
  } finally {
    await client.close();
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
