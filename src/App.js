import React, { useState, useEffect, Fragment } from 'react';

const stateInicial = {
  mascota: '',
  propietario: '',
  fecha: '',
  hora:'',
  sintomas:''
}

function Cita ({cita, index, eliminarCita}) {
  return (
    <div className="cita">
      <p>Mascota <span>{cita.mascota}</span></p>
      <p>Dueño <span>{cita.propietario}</span></p>
      <p>Fecha <span>{cita.fechas}</span></p>
      <p>Hora <span>{cita.hora}</span></p>
      <p>Sintomas <span>{cita.sintomas}</span></p>
      <button 
        onClick={() => eliminarCita(index)}
        type="button" className="button eliminar u-full-width"> Eliminar X</button>
    </div>
  )
}

function Formulario({crearCita}) {

  const [cita, actualizarCita ] = useState(stateInicial);

  const actualizarState = e => {
    actualizarCita({
      ...cita,
      [e.target.name]: e.target.value
    })
  }

  console.log(cita);

  const enviarCita = e => {
    e.preventDefault();
    console.log(cita)
    // pasar la cita hacia el componente princial
    crearCita(cita);
    // Reiniciar el state (reinciar el form)
    actualizarCita(stateInicial)
  }

  return (
    <Fragment>
      <h2>Crear Cita</h2>
      <form onSubmit={enviarCita}>
        <label>Nombre Mascota</label>
        <input 
          type="text" 
          name="mascota"
          className="u-full-width" 
          placeholder="Nombre Mascota" 
          onChange={actualizarState}
          value={cita.mascota}
        />

        <label>Nombre Dueño</label>
        <input 
          type="text" 
          name="propietario"
          className="u-full-width"  
          placeholder="Nombre Dueño de la Mascota" 
          onChange={actualizarState}
          value={cita.propietario}
        />

        <label>Fecha</label>
        <input 
          type="date" 
          className="u-full-width"
          name="fecha"
          onChange={actualizarState}
          value={cita.fecha}
        />               

        <label>Hora</label>
        <input 
          type="time" 
          className="u-full-width"
          name="hora"
          onChange={actualizarState} 
          value={cita.hora}
        />

        <label>Sintomas</label>
        <textarea 
          className="u-full-width"
          name="sintomas"
          onChange={actualizarState}
          value={cita.sintomas}
        ></textarea>

        <button type="submit" className="button-primary u-full-width">Agregar</button>
      </form>
  </Fragment>
  )
}


function App() {
  // use state retorna 2 funciones
  // el state actual = this.state
  // funcion que actualiza el state this.state()

  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  console.log(citasIniciales);
  if (citasIniciales) {
    citasIniciales = [];
  }

  const [citas, guardarCita ] = useState(citasIniciales);

  useEffect (
    () => {
      let citasIniciales = JSON.parse(localStorage.getItem('citas'))
      if (citasIniciales) {
        localStorage.setItem('citas', JSON.stringify(citas))
      }
    }, [citas]
  )

  // Agregar las nuevas citas al state

  const crearCita = cita => {
    // Tomar una copia del state y agregar el nuevo cliente
    const nuevasCitas = [...citas, cita];
    console.log(nuevasCitas);
    // Almacenamos en el state
    guardarCita(nuevasCitas);
  }

  const eliminarCita = index => {
    const nuevasCitas = [...citas];
    nuevasCitas.splice(index, 1);
    guardarCita(nuevasCitas);
  }
  
  const titulo = Object.keys(citas).length === 0 ? 'No hay citas' : 'Administar las citas';

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario 
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita, index) => (
              <Cita 
                key={index}
                index={index}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default App;