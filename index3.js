const formGetReserva = document.getElementById('getReserva');
const formPostReserva = document.getElementById('postReserva');
const formPutReserva = document.getElementById('putReserva');
const formDeleteReserva = document.getElementById('deleteReserva');
const btnListarReservas = document.getElementById('btnListarReservas');

// GET - Buscar reserva por ID
formGetReserva.addEventListener('submit', async (e) => {
  e.preventDefault();
  let message = '';
  const id = document.getElementById('idGetReserva').value;

  try {
    const response = await fetch(`http://127.0.0.1:3000/reserva/${id}`);
    const data = await response.json();
    
    if (response.ok && data.id) {
      message = `
        <strong>📋 Reserva Encontrada:</strong><br>
        ID: ${data.id}<br>
        Usuario ID: ${data.usuario_id}<br>
        Libro ID: ${data.libro_id}<br>
        Fecha Reserva: ${formatearFecha(data.fecha_reserva)}<br>
        Fecha Devolución: ${formatearFecha(data.fecha_devolucion)}<br>
        Estado: <span style="font-weight: bold; color: ${getColorEstado(data.estado)}">${data.estado}</span>
      `;
    } else {
      message = data.message || '❌ Reserva no encontrada';
    }
  } catch (error) {
    message = '❌ Error al buscar reserva: ' + error.message;
  }

  document.getElementById('textoGetReserva').innerHTML = message;
});

// POST - Crear nueva reserva
formPostReserva.addEventListener('submit', async (e) => {
  e.preventDefault();
  let message = '';
  
  const usuario_id = document.getElementById('usuarioIdPost').value;
  const libro_id = document.getElementById('libroIdPost').value;
  const fecha_reserva = document.getElementById('fechaReservaPost').value;
  const fecha_devolucion = document.getElementById('fechaDevolucionPost').value;

  try {
    const response = await fetch('http://127.0.0.1:3000/reserva/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        usuario_id: parseInt(usuario_id),
        libro_id: parseInt(libro_id),
        fecha_reserva: fecha_reserva,
        fecha_devolucion: fecha_devolucion,
        estado: 'activa'
      }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      message = `✅ ${data.message} - ID: ${data.id}`;
      // Limpiar formulario
      e.target.reset();
    } else {
      message = '❌ Error: ' + data.error;
    }
  } catch (error) {
    message = '❌ Error al crear reserva: ' + error.message;
  }

  document.getElementById('textoPostReserva').innerHTML = message;
});

// LISTAR TODAS LAS RESERVAS
btnListarReservas.addEventListener('click', async () => {
  let message = '<div style="text-align: center;">⏳ Cargando...</div>';
  document.getElementById('textoListarReservas').innerHTML = message;

  try {
    const response = await fetch('http://127.0.0.1:3000/reserva/');
    const data = await response.json();
    
    if (response.ok && Array.isArray(data) && data.length > 0) {
      message = '<div style="margin-bottom: 15px;"><strong>📊 Total de Reservas: ' + data.length + '</strong></div>';
      
      data.forEach((reserva, index) => {
        const colorEstado = getColorEstado(reserva.estado);
        message += `
          <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid ${colorEstado};">
            <strong>#${index + 1} - Reserva ID: ${reserva.id}</strong><br>
            Usuario ID: ${reserva.usuario_id} | Libro ID: ${reserva.libro_id}<br>
            Reserva: ${formatearFecha(reserva.fecha_reserva)} → Devolución: ${formatearFecha(reserva.fecha_devolucion)}<br>
            Estado: <span style="color: ${colorEstado}; font-weight: bold;">${reserva.estado.toUpperCase()}</span>
          </div>
        `;
      });
    } else {
      message = '<div style="text-align: center; padding: 20px;">📭 No hay reservas registradas</div>';
    }
  } catch (error) {
    message = '<div style="color: red;">❌ Error al listar reservas: ' + error.message + '</div>';
  }

  document.getElementById('textoListarReservas').innerHTML = message;
});

// PUT - Actualizar reserva
formPutReserva.addEventListener('submit', async (e) => {
  e.preventDefault();
  let message = '';
  
  const id = document.getElementById('idPutReserva').value;
  const usuario_id = document.getElementById('usuarioIdPut').value;
  const libro_id = document.getElementById('libroIdPut').value;
  const fecha_reserva = document.getElementById('fechaReservaPut').value;
  const fecha_devolucion = document.getElementById('fechaDevolucionPut').value;
  const estado = document.getElementById('estadoPut').value;

  try {
    const response = await fetch(`http://127.0.0.1:3000/reserva/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        usuario_id: parseInt(usuario_id),
        libro_id: parseInt(libro_id),
        fecha_reserva: fecha_reserva,
        fecha_devolucion: fecha_devolucion,
        estado: estado
      }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      message = `✅ ${data.message}`;
      e.target.reset();
    } else {
      message = '❌ ' + data.message;
    }
  } catch (error) {
    message = '❌ Error al actualizar reserva: ' + error.message;
  }

  document.getElementById('textoPutReserva').innerHTML = message;
});

// DELETE - Cancelar reserva
formDeleteReserva.addEventListener('submit', async (e) => {
  e.preventDefault();
  let message = '';
  const id = document.getElementById('idDeleteReserva').value;

  // Confirmar antes de cancelar
  if (!confirm('¿Estás seguro de cancelar esta reserva?')) {
    return;
  }

  try {
    const response = await fetch(`http://127.0.0.1:3000/reserva/${id}`, {
      method: 'DELETE',
    });
    
    const data = await response.json();
    
    if (response.ok) {
      message = `✅ ${data.message}`;
      e.target.reset();
    } else {
      message = '❌ ' + data.message;
    }
  } catch (error) {
    message = '❌ Error al cancelar reserva: ' + error.message;
  }

  document.getElementById('textoDeleteReserva').innerHTML = message;
});

// FUNCIONES AUXILIARES

// Formatear fecha de MySQL a formato legible
function formatearFecha(fecha) {
  if (!fecha) return 'N/A';
  const date = new Date(fecha);
  const dia = String(date.getDate()).padStart(2, '0');
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const anio = date.getFullYear();
  return `${dia}/${mes}/${anio}`;
}

// Obtener color según el estado
function getColorEstado(estado) {
  switch(estado) {
    case 'activa':
      return '#28a745'; // Verde
    case 'completada':
      return '#007bff'; // Azul
    case 'cancelada':
      return '#dc3545'; // Rojo
    default:
      return '#6c757d'; // Gris
  }
}