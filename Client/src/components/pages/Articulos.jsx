import React, { useState, useEffect } from "react";
import { Global } from "../../helpers/Global"; // Asegúrate que esta ruta sea correcta
import { Peticion } from "../../helpers/Peticion";
import { Listado } from "./Listado";


export const Articulos = () => {
  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    conseguirArticulos();
  }, []);

  const conseguirArticulos = async () => {
    
    const {datos,cargando} = await Peticion( Global.url + "articulos","GET");
    
    try {
  
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
            articulos.length >= 1 ? <Listado articulos={articulos} setArticulos={setArticulos}/> 
            : <h1>No hay artículos</h1>
        }
    </>
  );
};