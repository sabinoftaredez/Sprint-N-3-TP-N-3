// Conexión a la base de datos de MongoDB
import mongoose from 'mongoose';
export async function connectDB() {
  try {
    await mongoose.connect('mongodb+srv://Grupo-14:grupo14@cursadanodejs.ls9ii.mongodb.net/Node-js');
    console.log('Conectado a la base de datos de MongoDB');
  } catch (error) {
    console.error('Error al conectar a la base de datos de MongoDB', error);
    process.exit(1);
  }
}