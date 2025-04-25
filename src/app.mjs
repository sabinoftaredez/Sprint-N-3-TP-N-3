import express from 'express';
import path from 'path'; // Para manejar rutas de archivos.
import { connectDB } from './Config/dbConfig.mjs';
import { superheroeRoutes } from './Routes/superheroeRoutes.mjs'; // Asegurarme que coincida.
import methodOverride from 'method-override'; // Para poder usar PUT y DELETE en formularios HTML.
import { url } from 'inspector';
import { fileURLToPath, URL } from 'url';
const app = express();
const PORT = process.env.PORT || 3005;
// Method Override para poder usar PUT y DELETE en formularios HTML.
app.use(methodOverride('_method'));
// Obtener la ruta del directorio actual.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Configurar EJS.
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'View')); // Asegurarme que la ruta sea correcta.
console.log('Ruta de vistas configurada:', path.join(__dirname, 'View')) // Verificar la ruta de las vistas.
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
// Carpeta Public para archivos estáticos CSS.
app.use(express.static('Public')); // Asegurarme que la ruta sea correcta.
// Bienvenida al Servidor.
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en el http://localhost:${PORT}`);
});