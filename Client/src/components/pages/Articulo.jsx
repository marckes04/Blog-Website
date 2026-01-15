import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { Peticion } from "../../helpers/Peticion";

export const Articulo = () => {
  // CORRECCIÓN 1: Inicializar como objeto {}, no array [], ya que es un solo articulo
  const [articulo, setArticulo] = useState({}); 
  const [cargando, setCargando] = useState(true);
  const params = useParams();

  useEffect(() => {
    conseguirArticulo();
  }, [params.id]); // Agregamos params.id por si cambia la URL

  const conseguirArticulo = async () => {
    setCargando(true);
    
    // CORRECCIÓN 2: No desestructuramos 'cargando' aquí para evitar conflictos con el estado
    const { datos } = await Peticion(Global.url + "articulo/" + params.id, "GET");

    if (datos.status === "success") {
        setArticulo(datos.articulo);
    }
    
    // El estado cargando se actualiza al final
    setCargando(false);
  };

 return (
    <div className="jumbo">
      {cargando ? (
        "Cargando..."
      ) : (
        <>
          {/* MÁSCARA / IMAGEN */}
          <div className="mascara">
            {articulo.imagen !== "default.png" && (
              <img
                src={Global.url + "imagen/" + articulo.imagen}
                alt="Imagen del articulo"
              />
            )}
            {articulo.imagen === "default.png" && (
              <img
                src="https://1000logos.net/wp-content/uploads/2025/03/question-mark.png"
                alt="Imagen por defecto"
              />
            )}
          </div>

          {/* TITULO */}
          <h1>{articulo.titulo}</h1>

          {/* FECHA CENTRADA (Agregada aquí) */}
          <span className="fecha">
            {/* Formateamos la fecha para que se vea bonita */}
            {new Date(articulo.fecha).toLocaleDateString()}
          </span>

          {/* CONTENIDO */}
          <p>{articulo.contenido}</p>
        </>
      )}
    </div>
  );
};