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

    // 1. Recoger datos del formulario
    let nuevoArticulo = formulario;

    // 2. Guardar articulo (Datos de texto)
    const { datos } = await Peticion(Global.url + "crear", "POST", nuevoArticulo);

    if (datos.status === "success") {

      // --- PASO CRÍTICO: GESTIÓN DE LA IMAGEN ---
      
      const fileInput = document.querySelector("#file");

      // Verificamos si el usuario seleccionó un archivo
      if (fileInput.files[0]) {
        
        const formData = new FormData();
        formData.append('file0', fileInput.files[0]);

        // Subimos la imagen
        const subida = await Peticion(Global.url + "subir-imagen/" + datos.articulo._id, "POST", formData, true);

        // AQUI ESTABA EL ERROR: Ahora sí validamos la respuesta de la imagen
        if (subida.datos.status === "success") {
          setResultado("guardado");
        } else {
          setResultado("error"); // La imagen falló (extensión mala, etc.)
        }

      } else {
        // Si no seleccionó imagen, pero el artículo se guardó, entonces es éxito
        setResultado("guardado");
      }

    } else {
      // Falló al guardar el artículo (texto)
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