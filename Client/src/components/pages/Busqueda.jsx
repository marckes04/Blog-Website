import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { Peticion } from "../../helpers/Peticion";
import { Listado } from "./Listado";

export const Busqueda = () => {
  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const params = useParams();

  useEffect(() => {
    conseguirArticulos();
  }, [params.busqueda]); // <--- CORRECCIÓN 1: Agregada la dependencia

  const conseguirArticulos = async () => {
    setCargando(true); // Es importante ponerlo en true al iniciar una nueva búsqueda

    // CORRECCIÓN 2: Falta el slash "/" antes del término de búsqueda
    // Asegúrate de que la URL quede bien formada (ej: .../api/buscar/termino)
    const url = Global.url + "buscar/" + params.busqueda;

    try {
      // CORRECCIÓN 3: Peticion debe estar dentro del try para capturar errores de red
      const { datos } = await Peticion(url, "GET");

      if (datos.status === "success") {
        setArticulos(datos.articulos);
      } else {
        setArticulos([]); // Limpiar si no hay éxito
      }
    } catch (error) {
      console.log("Error en la petición:", error);
      setArticulos([]);
    }

    setCargando(false);
  };

  return (
    <>
      {cargando ? (
        "Cargando..."
      ) : articulos.length >= 1 ? (
        <Listado articulos={articulos} setArticulos={setArticulos} />
      ) : (
        <h1>No hay artículos</h1>
      )}
    </>
  );
};