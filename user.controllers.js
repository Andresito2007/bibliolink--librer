const database = require('../config/database');
const mysql2 = require('mysql2');
//BUSCAR UN USUARIO EN NUESTRA BASE DE DATOS
const readUser = (req, res) => {
  const { id } = req.params;

  const readQuery = `SELECT * FROM User WHERE id=?;`;

  const query = mysql2.format(readQuery, [id]);

  database.query(query, (err, result) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).json({ error: err.message });
    }
    
    if (result && result.length > 0) {
      return res.json(result[0]);
    } else {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
  });
};
//REGISTRAR UN USUARIO PARA NUESTRA LIBRERIA
const createUser = (req, res) => {
  const { nombre, email, telefono, estado } = req.body;

  const createQuery = `INSERT INTO User(nombre, email, telefono, estado) VALUES(?, ?, ?, ?)`;

  const query = mysql2.format(createQuery, [nombre, email, telefono, estado || 'activo']);

  database.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ 
      message: 'Usuario creado',
      id: result.insertId 
    });
  });
};
//ACTUALIZAR UN USUARIO DE NUESTRA BIBLIOTECA
const updateUser = (req, res) => {
  const { id } = req.params;
  const { nombre, email, telefono, estado } = req.body;

  const updateQuery = `UPDATE User SET nombre=?, email=?, telefono=?, estado=? WHERE id=?`;

  const query = mysql2.format(updateQuery, [nombre, email, telefono, estado, id]);

  database.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario actualizado' });
  });
};
//ELIMINAR UN USARIO REGISTRADO DE NUESTRA BIBLIOTECA
const deleteUser = (req, res) => {
  const { id } = req.params;

  const deleteQuery = `DELETE FROM User WHERE id=?`;

  const query = mysql2.format(deleteQuery, [id]);

  database.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado' });
  });
};

module.exports = {
  createUser,
  readUser,
  updateUser,
  deleteUser,
};