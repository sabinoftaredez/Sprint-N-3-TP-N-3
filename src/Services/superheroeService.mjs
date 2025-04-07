import superheroeRepository from "../Repositories/superheroeRepository.mjs";
// Rutas GET.
// Obtener Superhéroe por ID.
export async function obtenerSuperheroePorId(id) {
    return await superheroeRepository.obtenerPorId(id);
}
// Buscar Superhéroe por Atributo.
export async function buscarSuperheroePorAtributo( atributo, valor ) {
    return await superheroeRepository.buscarPorAtributo( atributo, valor );
}
// Obtener Superhéroes mayores de 30 años.
export async function obtenerSuperheroeMayoresDe30() {
    return await superheroeRepository.obtenerMayoresDe30();
}
// Obtener todos los Superhéroes.
export async function obtenerTodosLosSuperheroe() {
    return await superheroeRepository.obtenerTodos();
}
// Rutas CRUD.
// Crear Superhéroe.
export async function crearSuperheroe(data) {
    return await superheroeRepository.crear(data);
}
// Actualizar Superhéroe.
export async function actualizarSuperheroe(id, data) {
    return await superheroeRepository.actualizar(id, data);
}
// Eliminar Superhéroe.
export async function eliminarSuperheroe(id) {
    return await superheroeRepository.eliminar(id);
}
// Eliminar Superhéroe por Atributo.
export async function eliminarPorNombreSuperheroe(nombreSuperheroe) {
    return await superheroeRepository.eliminarPorNombreSuperheroe(nombreSuperheroe);
}
export async function eliminarPorNombreReal(nombreReal) {
    return await superheroeRepository.eliminarPorNombreReal(nombreReal);
}