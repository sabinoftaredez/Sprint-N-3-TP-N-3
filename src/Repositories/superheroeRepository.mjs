import superheroe from "../Models/superheroe.mjs";
import IRepository from "./IRepository.mjs";
class SuperheroeRepository extends IRepository {
    // Métodos GET. === Obtener, buscar y filtrar.
    async obtenerPorId(id) {
        return await superheroe.findById(id);
    }
    async obtenerTodos() {
        return await superheroe.find();
    }
    async buscarPorAtributo(atributo, valor) {
        return await superheroe.find({ [atributo]: valor });
    }
    async obtenerMayoresDe30() {
        return await superheroe.find({
            $and: [
                { edad: { $gt: 30 } },
                { poder: { $type: "array"} },
                { $expr: { $gte: [ { $size: "$poder" }, 2 ] } },
            ]
        });
    }
    // Métodos CRUD. === Crear, actualizar y eliminar.
    async crear(data) {
        return await superheroe.create(data);
    }
    async actualizar(id, data) {
        return await superheroe.findByIdAndUpdate(id, data, { new: true, runValidators: true }); // new: true devuelve el documento actualizado, runValidators aplica las validaciones del esquema.
    }
    async eliminar(id) {
        return await superheroe.findByIdAndDelete(id);
    }
    async eliminarPorNombreSuperheroe(nombreSuperheroe) {
        console.log("Eliminando Superheroe por nombreSuperheroe:", nombreSuperheroe);
        return await superheroe.findOneAndDelete({ nombreSuperheroe });
    }
    async eliminarPorNombreReal(nombreReal) {
        console.log("Eliminando Superheroe por nombreReal:", nombreReal);
        return await superheroe.findOneAndDelete({ nombreReal });
    }
}
export default new SuperheroeRepository();