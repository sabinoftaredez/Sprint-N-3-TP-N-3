import express from 'express';
import {
    obtenerSuperheroePorIdController,
    buscarSuperheroePorAtributoController,
    obtenerSuperheroeMayoresDe30Controller,
    obtenerTodosLosSuperheroeController,
    crearSuperheroeController,
    mostrarFormularioCrearSuperheroeController,
    actualizarSuperheroeController,
    mostrarFormularioActualizarSuperheroeController,
    mostrarFormularioEliminarSuperheroeController,
    eliminarSuperheroePorAtributoController,
    eliminarSuperheroeController,
} from '../Controllers/superheroeControllers.mjs';
import { manejarErroresValidacion, validarObjectId } from '../Middlewares/validationHandler.mjs';
import { validarSuperheroe, validarEliminarPorAtributo } from '../Validators/superheroeValidators.mjs';
const superheroeRoutes = express.Router();
// RUTAS CRUD
// FORMULARIO CREAR SUPERHEROE.
superheroeRoutes.get('/superheroes/new', mostrarFormularioCrearSuperheroeController);

// CREAR SUPERHEROE.
superheroeRoutes.post('/superheroes', (req, res, next) => {
    console.log('Middleware validarSuperheroe ejecutado');
    next();
}, validarSuperheroe, manejarErroresValidacion('superheroes/new'), crearSuperheroeController);

// FORMULARIO ELIMINAR SUPERHEROE.
superheroeRoutes.get('/superheroes/deleteAttribute', mostrarFormularioEliminarSuperheroeController);

// ELIMINAR SUPERHEROE POR ATRIBUTO.
superheroeRoutes.post('/superheroes/delete', ( req, res, next ) => {
    console.log('Middleware validarEliminarPorAtributo ejecutado');
    next();
}, validarEliminarPorAtributo, eliminarSuperheroePorAtributoController);

// ELIMINAR SUPERHEROE POR ID.
superheroeRoutes.delete('/superheroes/:id/delete', ( req, res, next ) => {
    console.log('Middleware validarObjectId ejecutado', req.params.id);
    next();
}, validarObjectId(), manejarErroresValidacion(), eliminarSuperheroeController);

// FORMULARIO ACTUALIZAR SUPERHEROE.
superheroeRoutes.get('/superheroes/:id/edit', validarObjectId(), mostrarFormularioActualizarSuperheroeController);

// ACTUALIZAR SUPERHEROE.
superheroeRoutes.post('/superheroes/:id', (req, res, next) => {
    console.log('Middleware validarObjectId ejecutado');
    next();
}, validarObjectId(), validarSuperheroe, actualizarSuperheroeController);

// Rutas GET
// Rutas más específicas primero
superheroeRoutes.get('/superheroes/mayoresDe30', obtenerSuperheroeMayoresDe30Controller);
superheroeRoutes.get('/superheroes/atributo/:atributo/:valor', buscarSuperheroePorAtributoController);
// Mover antes de /:id
superheroeRoutes.get('/superheroes/:id', validarObjectId(),obtenerSuperheroePorIdController);
superheroeRoutes.get('/superheroes', obtenerTodosLosSuperheroeController);
export { superheroeRoutes };
