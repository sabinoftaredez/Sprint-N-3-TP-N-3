import { obtenerSuperheroePorId, buscarSuperheroePorAtributo, obtenerSuperheroeMayoresDe30, obtenerTodosLosSuperheroe, crearSuperheroe, actualizarSuperheroe, eliminarSuperheroe, eliminarPorNombreSuperheroe, eliminarPorNombreReal } from '../Services/superheroeService.mjs';
import { renderizarSuperheroe, renderizarListaSuperheroe } from '../View/responseView.mjs';
// Funciones GET.
// Obtener Superhéroe por ID.
export async function obtenerSuperheroePorIdController(req, res) {
    try {
        const { id } = req.params;
        const superheroe = await obtenerSuperheroePorId(id);
        if (!superheroe) {
            return res.status(404).send({ message: 'Superhéroe no encontrado' });
        }
        const superheroeFormateado = renderizarSuperheroe(superheroe);
        res.status(200).send(superheroeFormateado);
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener superhéroe por ID', error: error.message });
    }
}// Buscar Superhéroe por Atributo.
export async function buscarSuperheroePorAtributoController(req, res) {
    try {
        const { atributo, valor } = req.params;
        const superheroe = await buscarSuperheroePorAtributo( atributo, valor );
        if (superheroe.length === 0) {
            return res.status(404).send({ message: 'Superhéroes no encontrados' });
        }
        const superheroeFormateados = renderizarListaSuperheroe(superheroe);
        res.status(200).send(superheroeFormateados);
    } catch (error) {
        res.status(500).send({ message: 'Error al buscar superhéroes por atributo', error: error.message });
    }
}
// Obtener Superhéroes mayores de 30 años.
export async function obtenerSuperheroeMayoresDe30Controller(req, res) {
    try {
        // Obtener todos los superhéroes mayores de 30 años
        let superheroe = await obtenerSuperheroeMayoresDe30();
        if (superheroe.length === 0) {
            return res.status(404).send({ message: 'Superhéroes no encontrados' });
        }
        const superheroeFormateados = renderizarListaSuperheroe(superheroe);
        res.status(200).send(superheroeFormateados);
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener superhéroes mayores de 30 años', error: error.message });
    }
}
// Obtener todos los Superhéroes.
export async function obtenerTodosLosSuperheroeController(req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperheroe();
        const { action, id } = req.query; // Obtener los parámetros de la URL.
        let superheroe = null;
        if (action === 'edit' && id) {
            superheroe = await obtenerSuperheroePorId(id); // Obtener el superhéroe por ID.
            if (!superheroe) {
                return res.status(404).send({ message: 'Superhéroe no encontrado' });
            }
        }
        res.render('dashboard', { superheroes, superheroe, action, errors: [] }); // Pasar un array vacío para los errores.
        /*
        if (superheroe.length === 0) {
            return res.status(404).send({ message: 'No hay superhéroes disponibles' });
        }
        const superheroeFormateados = renderizarListaSuperheroe(superheroe);
        res.status(200).send(superheroeFormateados);
        */
    } catch (error) {
        console.error("Error en obtenerTodosLosSuperheroeController:", error);
        res.status(500).send({ message: 'Error al obtener todos los superhéroes', error: error.message });
    }
}
// Funciones CrUD.
// Mostrar Formulario Crear Superhéroe.
export async function mostrarFormularioCrearSuperheroeController(req, res) {
    try {
        res.render('superheroe/new', { errors: [] }); //Pasar un array vacío para los errores.
    } catch (error) {
        res.status(500).send({ message: 'Error al mostrar formulario de creación', error: error.message });
    }
}
// Crear Superhéroe.
export async function crearSuperheroeController(req, res) {
    try {
        const {nombreSuperheroe, nombreReal, edad, planetaOrigen, debilidad, poder = [], aliado, enemigo, creador = []} = req.body;
        const superheroeCreado = await crearSuperheroe({ nombreSuperheroe, nombreReal, edad, planetaOrigen, debilidad, poder, aliado, enemigo, creador });
        if (!superheroeCreado) {
            // Si no envió un respuesta aquí, Postman queda en bucle.
            return res.status(400).send({ message: 'Error al crear superhéroe' });
        }
        res.status(201).send({ message: 'Superhéroe creado exitosamente' });
    } catch (error) {
        res.status(500).send({ message: 'Error al crear superhéroe', error: error.message });
    }
}
// Mostrar Formulario Actualizar o Editar Superhéroe.
export async function mostrarFormularioActualizarSuperheroeController(req, res) {
    try {
        const { id } = req.params;
        const superheroe = await obtenerSuperheroePorId(id);
        if (!superheroe) {
            return res.status(404).send({ message: 'Superhéroe no encontrado' });
        }
        res.render('superheroe/edit', { superheroe, errors: [] }); // Pasar un array vacío para los errores.
    } catch (error) {
        res.status(500).send({ message: 'Error al mostrar formulario de actualización', error: error.message });
    }
}
// Actualizar Superhéroe.
export async function actualizarSuperheroeController(req, res) {
    try {
        const { id } = req.params;
        let { nombreSuperheroe, nombreReal, edad, planetaOrigen, debilidad, poder, aliado, enemigo, creador } = req.body;
        const datosActualizados = { nombreSuperheroe, nombreReal, edad, planetaOrigen, debilidad, poder, aliado, enemigo, creador };
        const superheroeActualizado = await actualizarSuperheroe(id, datosActualizados);
        if (!superheroeActualizado) {
            return res.status(404).send({ message: 'Superhéroe no encontrado' });
        }
        res.status(200).send({ message: 'Superhéroe actualizado exitosamente' });
    } catch (error) {
        res.status(500).send({ message: 'Error al actualizar superhéroe', error: error.message });
    }
}
// Eliminar Superhéroe.
export async function eliminarSuperheroeController(req, res) {
    console.log("Controlador de Eliminar por ID:", req.params.id);
    try {
        const { id } = req.params;
        const superheroeEliminado = await eliminarSuperheroe(id);
        if (!superheroeEliminado) {
            return res.status(404).send({ message: 'Superhéroe no encontrado' });
        }
        res.status(200).send({ message: 'Superhéroe eliminado exitosamente' });
    } catch (error) {
        res.status(500).send({ message: 'Error al eliminar superhéroe', error: error.message });
    }
}
// Mostrar Formulario para eliminar Superhéroe por Atributo.
export async function mostrarFormularioEliminarSuperheroeController(req, res) {
    try {
        res.render('superheroe/delete', { errors: [] }); //Pasar un array vacío para los errores.
    } catch (error) {
        res.status(500).send({ message: 'Error al mostrar formulario de Eliminación', error: error.message });
    }
}
// Eliminar Superhéroe por Atributo.
export async function eliminarSuperheroePorAtributoController(req, res) {
    try {
        const { nombreSuperheroe, nombreReal } = req.body;
        console.log("Datos del Formulario:", nombreSuperheroe, nombreReal);
        let superheroeEliminadoPorAtributo = null;
        if (nombreSuperheroe) {
            console.log("intentando eliminar por nombreSuperheroe:", nombreSuperheroe);
            superheroeEliminadoPorAtributo = await eliminarPorNombreSuperheroe(nombreSuperheroe);
        }
        if (nombreReal) {
            console.log("intentando eliminar por nombreReal:", nombreReal);
            superheroeEliminadoPorAtributo = await eliminarPorNombreReal(nombreReal);
        }
        if (!superheroeEliminadoPorAtributo) {
            console.log("No se encontró el superhéroe por atributo");
            return res.status(404).send({ message: 'Superhéroe no encontrado por atributo' });
            }
        res.status(200).send({ message: 'Superhéroe eliminado exitosamente' });
    } catch (error) {
        console.error("Error en eliminarSuperheroePorAtributoController:", error);
            res.status(400).send({ message: 'Error para eliminar Superheroe por atributo' });
    }
}