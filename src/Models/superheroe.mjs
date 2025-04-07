import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const superheroeSchema = new Schema({
    nombreSuperheroe: { type: String, required: true, unique: true },
    nombreReal: { type: String, required: true, unique: true },
    edad: { type: Number, min: 0 },
    planetaOrigen: { type: String, default: 'Desconocido' },
    debilidad: { type: String, required: true },
    poder: { type: [String], required: true },
    aliado: { type: String, required: true },
    enemigo: { type: String, required: true },
    creador: { type: [String], required: true },
}, { timestamps: true }); // Crea automáticamente los campos createdAt y updatedAt
const Superheroe = mongoose.model('Superheroe', superheroeSchema, 'Grupo-14');
export default Superheroe;