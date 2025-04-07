export function renderizarSuperheroe(superheroe) {
    return{
        Nombre: superheroe.nombreSuperheroe,
        "Nombre Real": superheroe.nombreReal,
        Edad: superheroe.edad,
        "Planeta de Origen": superheroe.planetaOrigen,
        Dibilidad: superheroe.debilidad,
        Poder: superheroe.poder,
        Aliado: superheroe.aliado,
        Enemigo: superheroe.enemigo,
        Creador: superheroe.Creador,
        "Fecha de Creación": superheroe.createdAt,
        "Fecha de Actualización": superheroe.updatedAt
    };
}
export function renderizarListaSuperheroe(superheroe) {
    return superheroe.map(renderizarSuperheroe);
}