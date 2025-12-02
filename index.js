const formGet = document.getElementById('getUsuario');
const formPost = document.getElementById('postUsuario');
const formPut = document.getElementById('putUsuario');
const formDelete = document.getElementById('deleteUsuario');

// GET, Buscar un usuario por id
formGet.addEventListener('submit', async (e) => {
  e.preventDefault();
  let message = '';
  const id = document.getElementById('idGet').value;
  //MANEJAMOS EXEPCIONES
  try {
    const response = await fetch(`http://127.0.0.1:3000/user/${id}`);
    const data = await response.json();
    
    if (response.ok && data.id) {
      message = `
        <strong>Usuario Encontrado:</strong><br>
        ID: ${data.id}<br>
        Nombre: ${data.nombre}<br>
        Email: ${data.email}<br>
        Teléfono: ${data.telefono}<br>
        Estado: ${data.estado}
      `;
    } else {
      message = data.message || 'Usuario no encontrado';
    }
  } catch (error) {
    message = 'Error al buscar usuario: ' + error.message;
  }

  document.getElementById('textoGet').innerHTML = message;
});

// POST - Crear nuevo usuario
formPost.addEventListener('submit', async (e) => {
  e.preventDefault();
  let message = '';
  
  const nombre = document.getElementById('nombrePost').value;
  const email = document.getElementById('emailPost').value;
  const telefono = document.getElementById('telefonoPost').value;

  try {
    const response = await fetch('http://127.0.0.1:3000/user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        nombre: nombre, 
        email: email, 
        telefono: telefono,
        estado: 'activo'
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
    message = '❌ Error al crear usuario: ' + error.message;
  }

  document.getElementById('textoPost').innerHTML = message;
});

// PUT - Actualizar usuario
formPut.addEventListener('submit', async (e) => {
  e.preventDefault();
  let message = '';
  
  const id = document.getElementById('idPut').value;
  const nombre = document.getElementById('nombrePut').value;
  const email = document.getElementById('emailPut').value;
  const telefono = document.getElementById('telefonoPut').value;
  const estado = document.getElementById('estadoPut').value;

  try {
    const response = await fetch(`http://127.0.0.1:3000/user/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        nombre: nombre, 
        email: email, 
        telefono: telefono,
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
    message = '❌ Error al actualizar usuario: ' + error.message;
  }

  document.getElementById('textoPut').innerHTML = message;
});

// DELETE - Eliminar usuario
formDelete.addEventListener('submit', async (e) => {
  e.preventDefault();
  let message = '';
  const id = document.getElementById('idDelete').value;

  // Confirmar antes de eliminar
  if (!confirm('¿Estás seguro de eliminar este usuario?')) {
    return;
  }

  try {
    const response = await fetch(`http://127.0.0.1:3000/user/${id}`, {
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
    message = '❌ Error al eliminar usuario: ' + error.message;
  }

  document.getElementById('textoDelete').innerHTML = message;
});