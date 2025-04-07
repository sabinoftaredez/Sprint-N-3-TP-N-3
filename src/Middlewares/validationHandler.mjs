import mongoose from "mongoose";
import { validationResult } from "express-validator";
// Validaciones de ObjectId.
export const validarObjectId = (paramName = 'id') => (req, res, next) => {
    const id = req.params[paramName];
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: `El ID ${id} no es válido` });
    }
    next();
}
// Validaciones de Errores.
export const manejarErroresValidacion = (view = null) => (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('Errores de validación:', errors.array());
        if (view) {
            return res.status(400).render(view, {errors: errors.array()});
        }
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}
// Validación Personalizada por Atributo en el Body para Eliminar.
export const validarAtributosEliminar = (req, res, next) => {
    const { nombreSuperheroe, nombreReal } = req.body;
    if (!nombreSuperheroe && !nombreReal) {
        return res.status(400).json({ error: 'Debes proporcionar un atributo de tipo nombre para eliminar' });
    }
    if (nombreSuperheroe && typeof nombreSuperheroe !== 'string') {
        return res.status(400).json({ error: 'El atributo nombreSuperheroe debe ser una cadena de texto' });
    }
    if (nombreReal && typeof nombreReal !== 'string') {
        return res.status(400).json({ error: 'El atributo nombreReal debe ser una cadena de texto' });
    }
    next();
}