const formGetLibro = document.getElementById('getLibro');
const formPostLibro = document.getElementById('postLibro');
const formPutLibro = document.getElementById('putLibro');
const formDeleteLibro = document.getElementById('deleteLibro');

// GET - Buscar libro por ID
formGetLibro.addEventListener('submit', async (e) => {
  e.preventDefault();
  let message = '';
  const id = document.getElementById('idGetLibro').value;
  try {
    const response = await fetch(`http://127.0.0.1:3000/libros/${id}`);
    const data = await response.json();
    
    if (response.ok && data.id) {
      message = `
        <strong>📚 Libro Encontrado:</strong><br>
        ID: ${data.id}<br>
        Nombre: ${data.nombre}<br>
        Tipo: ${data.tipo}<br>
        Autor: ${data.autor}<br>
        Estado: ${data.estado}
      `;
    } else {
      message = data.message || ' Libro no encontrado';
    }
  } catch (error) {
    message = ' Error al buscar libro: ' + error.message;
  }

  document.getElementById('textoGetLibro').innerHTML = message;
});

// POST - Crear nuevo libro
formPostLibro.addEventListener('submit', async (e) => {
  e.preventDefault();
  let message = '';
  
  const nombre = document.getElementById('nombrePostLibro').value;
  const tipo = document.getElementById('tipoPostLibro').value;
  const autor = document.getElementById('autorPostLibro').value;
  const estado = document.getElementById('estadoPostLibro').value;

  try {
    const response = await fetch('http://127.0.0.1:3000/libros/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        nombre: nombre, 
        tipo: tipo,
        autor: autor,
        estado: estado || 'disponible'
      }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      message = `✅ ${data.message} - ID: ${data.id}`;
      // Limpiar formulario
      e.target.reset();
    } else {
      message = ' Error: ' + data.error;
    }
  } catch (error) {
    message = ' Error al registrar libro: ' + error.message;
  }

  document.getElementById('textoPostLibro').innerHTML = message;
});

// PUT - Actualizar libro
formPutLibro.addEventListener('submit', async (e) => {
  e.preventDefault();
  let message = '';
  
  const id = document.getElementById('idPutLibro').value;
  const nombre = document.getElementById('nombrePutLibro').value;
  const tipo = document.getElementById('tipoPutLibro').value;
  const autor = document.getElementById('autorPutLibro').value;
  const estado = document.getElementById('estadoPutLibro').value;

  try {
    const response = await fetch(`http://127.0.0.1:3000/libros/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        nombre: nombre, 
        tipo: tipo,
        autor: autor,
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
    message = ' Error al actualizar libro: ' + error.message;
  }

  document.getElementById('textoPutLibro').innerHTML = message;
});

// DELETE - Eliminar libro
formDeleteLibro.addEventListener('submit', async (e) => {
  e.preventDefault();
  let message = '';
  const id = document.getElementById('idDeleteLibro').value;

  // Confirmar antes de eliminar
  if (!confirm('¿Estás seguro de eliminar este libro del catálogo?')) {
    return;
  }

  try {
    const response = await fetch(`http://127.0.0.1:3000/libros/${id}`, {
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
    message = '❌ Error al eliminar libro: ' + error.message;
  }

  document.getElementById('textoDeleteLibro').innerHTML = message;
});
//CREAMOS NUESTRAS CONTRASEÑAS PARA LOS ADMINISTRADORES PARA LOS LIBROS
  const btnAdmin = document.getElementById('btnAdmin');
  const adminPass = document.getElementById('adminPass');
  const adminSection = document.getElementById('adminSection');
  const msgAdmin = document.getElementById('msgAdmin');
  btnAdmin.addEventListener('click', () => {
    const claveingresada = adminPass.value;
    // CAMBIA ESTA POR TU CONTRASEÑA
    const contraseñaCorrecta = "interfaces123";
    if (claveingresada === contraseñaCorrecta) { //condicionales
      adminSection.style.display = "block";   // mostramos el formulario
      msgAdmin.textContent = "Bienvenido Administrador";
      msgAdmin.style.color = "green";  //le damos color a los textos
    } else {
      msgAdmin.textContent = "Contraseña incorrecta";
      msgAdmin.style.color = "red";
    }
  });

