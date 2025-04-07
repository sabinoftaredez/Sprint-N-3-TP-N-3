import express from 'express';
import { connectDB } from './Config/dbConfig.mjs';
import { superheroeRoutes } from './Routes/superheroeRoutes.mjs'; // Asegurarme que coincida.
import methodOverride from 'method-override'; // Para poder usar PUT y DELETE en formularios HTML.
const app = express();
const PORT = process.env.PORT || 3005;
// Method Override para poder usar PUT y DELETE en formularios HTML.
app.use(methodOverride('_method'));
// Configurar EJS.
app.set('view engine', 'ejs');
app.set('views', './src/View'); // Asegurarme que la ruta sea correcta.
// Middleware para recibir JSON y datos de formularios.
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
// Conexión a la base de datos.
connectDB();
// Rutas.
app.use('/api/', superheroeRoutes); // Asegurarme que la ruta comience con una barra inclinada.
// Error en las Rutas NO Encontradas.
app.use((req, res) => {
    res.status(404).send({ message: "Ruta no encontrada" });
});
// Capeta Publica para archivos estáticos.
app.use(express.static('Public')); // Asegurarme que la ruta sea correcta.
// Bienvenida al Servidor.
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el http://localhost:${PORT}`);
});