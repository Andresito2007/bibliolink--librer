const database = require('../config/database');
const mysql2 = require('mysql2');
//BUSCAR UN USUARIO EN NUESTRA BASE DE DATOS
const readLibro = (req, res) => {
  const { id } = req.params;

  const readQuery = `SELECT * FROM Libros WHERE id=?;`;

  const query = mysql2.format(readQuery, [id]);

  database.query(query, (err, result) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).json({ error: err.message });
    }
    
    if (result && result.length > 0) {
      return res.json(result[0]);
    } else {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }
  });
};
//REGISTRAR UN LIBRO PARA NUESTRA LIBRERIA
const createLibro = (req, res) => {
  const { nombre, tipo, autor, estado } = req.body;

  const createQuery = `INSERT INTO Libros(nombre, tipo, autor, estado) VALUES(?, ?, ?, ?)`;

  const query = mysql2.format(createQuery, [nombre, tipo, autor, estado || 'activo']);

  database.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ 
      message: 'Libro Creado',
      id: result.insertId 
    });
  });
};
//ACTUALIZAR UN LIBRO DE NUESTRA BIBLIOTECA
const updateLibro = (req, res) => {
  const { id } = req.params;
  const { nombre, tipo, autor, estado } = req.body;

  const updateQuery = `UPDATE Libros SET nombre=?, tipo=?, autor=?, estado=? WHERE id=?`;

  const query = mysql2.format(updateQuery, [nombre, tipo, autor, estado, id]);

  database.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }
    res.json({ message: 'Libro actualizado' });
  });
};
//ELIMINAR UN LIBRO REGISTRADO DE NUESTRA BIBLIOTECA
const deleteLibro = (req, res) => {
  const { id } = req.params;

  const deleteQuery = `DELETE FROM Libros WHERE id=?`;

  const query = mysql2.format(deleteQuery, [id]);

  database.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }
    res.json({ message: 'Libro eliminado' });
  });
};

module.exports = {
  createLibro,
  readLibro,
  updateLibro,
  deleteLibro,
};

