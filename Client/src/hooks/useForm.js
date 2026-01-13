import { useState } from "react";

export const useForm = (objetoInicial = {}) => {
    
    const [formulario, setFormulario] = useState(objetoInicial);

    const serializeFormulario = (formElement) => {
        const formData = new FormData(formElement);
        const objeto_completo = {};

        for (let [name, value] of formData) {
            objeto_completo[name] = value;
        }
        return objeto_completo;
    }

    const enviado = (e) => {
        e.preventDefault();
        
        // serializamos el formulario del evento (e.target)
        const datosFormulario = serializeFormulario(e.target);

        setFormulario(datosFormulario);
        
        document.querySelector(".codigo").classList.add("enviado")
    }

    const cambiado = ({ target }) => {
        const { name, value } = target;

        setFormulario({
            ...formulario,
            [name]: value
        });
    }

    // CORRECCIÓN: La llave { debe estar en la misma línea del return
    return {
        formulario, // Devuelve el estado
        enviado,    // Devuelve la función submit
        cambiado    // Devuelve la función change
    };
}