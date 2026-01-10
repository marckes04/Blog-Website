const validator = require("validator");

const validarArticulo = (parametros) => {
    // Validar si parametros existe
    if (!parametros || Object.keys(parametros).length === 0) {
        throw new Error("No has enviado datos en el Body");
    }

    if (!parametros.titulo || !parametros.contenido) {
        throw new Error("Faltan datos por enviar (titulo o contenido)");
    }

    // Validación
    let validar_titulo = !validator.isEmpty(parametros.titulo) &&
                         validator.isLength(parametros.titulo, { min: 5, max: undefined });

    let validar_contenido = !validator.isEmpty(parametros.contenido);

    if (!validar_titulo || !validar_contenido) {
        throw new Error("La validación falló: Título (min 5 letras) o Contenido incorrectos.");
    }
}

module.exports = {
    validarArticulo
};