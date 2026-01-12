import React, { useState, useEffect } from "react";
import { Global } from "../../helpers/Global"; // Asegúrate que esta ruta sea correcta

export const Articulos = () => {
  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    conseguirArticulos();
  }, []);

  const conseguirArticulos = async () => {
    // CORRECCIÓN AQUÍ:
    // 1. Usamos Global.url (que es la base)
    // 2. Le concatenamos "articulos"
    // Resultado final: http://localhost:3900/api/articulos
    const url = Global.url + "articulos"; 
    
    try {
        let peticion = await fetch(url, {
            method: "GET"
        });

        let datos = await peticion.json();

        if(datos.status === "success"){
            setArticulos(datos.articulos);
        }

    } catch (error) {
        console.log("Error en la petición:", error);
    }
    
    setCargando(false);
  };

  return (
    <>
        {cargando ? "Cargando..." : 
            articulos.length >= 1 ? 
                articulos.map((articulo) => {
                    return (
                    <article key={articulo._id} className="articulo-item">
                        <div className="encabezado">
                            <h3 className="title">{articulo.titulo}</h3>
                        </div>
                        <div className="cuerpo">
                            <div className="mascara">
                                {/* OJO: Aquí falta la lógica para mostrar la imagen real si existe */}
                                <img
                                src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                alt="Imagen del articulo"
                                />
                            </div>
                            <div className="datos">
                                <p className="description">{articulo.contenido}</p>
                                <div className="acciones">
                                    <button className="button edit">Editar</button>
                                    <button className="button delete">Borrar</button>
                                </div>
                            </div>
                        </div>
                    </article>
                    );
                })
            : <h1>No hay artículos</h1>
        }
    </>
  );
};