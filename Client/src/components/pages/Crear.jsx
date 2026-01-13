import React, { useState } from 'react';
import { useForm } from "../../hooks/useForm";
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';

export const Crear = () => {

  const { formulario, enviado, cambiado } = useForm({});
  // Inicializamos el estado en "no_enviado"
  const [resultado, setResultado] = useState("no_enviado");

  const guardarArticulo = async (e) => {
    e.preventDefault();

    // Recoger datos del formulario
    let nuevoArticulo = formulario; 

    // Guardar articulo en el Backend
    // OJO: Asegúrate de que Peticion espere un Objeto o un JSON String. 
    // Normalmente se envía el objeto directo.
    const { datos } = await Peticion(Global.url + "crear", "POST", nuevoArticulo);

    if (datos.status === "success") {
      // CORRECCIÓN 1: Aquí cambiamos el estado a "guardado"
      setResultado("guardado");
    } else {
      // CORRECCIÓN 2: Aquí ponemos el string "error"
      setResultado("error");
    }
  }

  return (
    <div className='jumbo'>

      <h1>Crear Artículo</h1>
      <p>Formulario para crear un nuevo artículo</p>

      {/* --- MENSJES DE ALERTA --- */}
      
      {/* Mensaje de Éxito (Verde) */}
      {resultado === "guardado" && (
        <strong className="alerta alerta-exito">
           ¡Artículo guardado con éxito!
        </strong>
      )}

      {/* Mensaje de Error (Rojo) */}
      {resultado === "error" && (
        <strong className="alerta alerta-error">
           Los datos proporcionados son incorrectos
        </strong>
      )}

      {/* Montar Formulario */}
      <form className='formulario' onSubmit={guardarArticulo}>

        <div className='form-group'>
          <label htmlFor='titulo'>Título</label>
          <input
            type="text"
            name='titulo'
            onChange={cambiado}
            placeholder="Ej: Tutorial de React 2024"
          />
        </div>

        <div className='form-group'>
          <label htmlFor='contenido'>Contenido</label>
          <textarea
            name="contenido"
            onChange={cambiado}
            placeholder="Escribe el contenido del artículo aquí..."
          />
        </div>

        <div className='form-group'>
          <label htmlFor='file0'>Imagen</label>
          <input
            type="file"
            name='file0'
            id="file"
            onChange={cambiado}
          />
        </div>

        <input
          type='submit'
          value="Guardar"
          className='btn btn-success'
        />

      </form>
    </div>
  )
}