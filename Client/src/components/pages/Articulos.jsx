import React, { useState, useEffect } from "react";
import { Global } from "../../helpers/Global";

export const Articulos = () => {
  // Convención: usa camelCase para los setters (setArticulos)
  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    conseguirArticulos();
  }, []);

  const conseguirArticulos = async () => {
    // 1. CORRECCIÓN: Nombres de variables coincidentes (usar minúsculas es mejor práctica)
    const url = Global.articulos + "articulos"; 
    
    try {
        // 2. CORRECCIÓN: 'url' debe coincidir con la variable de arriba
        let peticion = await fetch(url, {
            method: "GET"
        });

        let datos = await peticion.json();

        // 3. CORRECCIÓN IMPORTANTE: Tienes que guardar los datos en el estado
        if(datos.status === "success"){
            setArticulos(datos.articulos);
        }

    } catch (error) {
        console.log(error);
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
                        {/* 1. EL TÍTULO */}
                        <div className="encabezado">
                            <h3 className="title">{articulo.titulo}</h3>
                        </div>

                        {/* 2. EL CUERPO */}
                        <div className="cuerpo">
                            {/* Imagen */}
                            <div className="mascara">
                                <img
                                src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                alt="Imagen del articulo"
                                />
                            </div>

                            {/* Texto y Botones */}
                            <div className="datos">
                                {/* 4. CORRECCIÓN: Seguramente en tu BD es 'contenido' en minúscula */}
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