export const Peticion = async (url, metodo, datosGuardar = "", archivos = false) => {

    let cargando = true;
    let opciones = {
        method: "GET"
    };

    // CASO 1: GET o DELETE (No llevan body normalmente)
    if (metodo == "GET" || metodo == "DELETE") {
        opciones = {
            method: metodo
        };
    }

    if (metodo == "POST" || metodo == "PUT") {
        
       
        if (archivos) {
            opciones = {
                method: metodo,
                body: datosGuardar // Se envía el FormData tal cual
              
            };
        } 
       
        else {
            opciones = {
                method: metodo,
                body: JSON.stringify(datosGuardar), // Convertimos a string JSON
                headers: {
                    "Content-Type": "application/json"
                }
            };
        }
    }

    // Realizar la petición
    const peticion = await fetch(url, opciones);
    const datos = await peticion.json();

    cargando = false;

    return {
        datos,
        cargando
    };
};