const database = require('../config/database');
const mysql2 = require('mysql2');

// BUSCAR UNA RESERVA POR ID
const readReserva = (req, res) => {
  const { id } = req.params;
  const readQuery = `SELECT * FROM Reservas WHERE id=?;`;
  const query = mysql2.format(readQuery, [id]);

  database.query(query, (err, result) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).json({ error: err.message });
    }
    
    if (result && result.length > 0) {
      return res.json(result[0]);
    } else {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }
  });
};

// LISTAR TODAS LAS RESERVAS
const listReservas = (req, res) => {
  const listQuery = `SELECT * FROM Reservas ORDER BY fecha_reserva DESC;`;

  database.query(listQuery, (err, result) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).json({ error: err.message });
    }
    return res.json(result);
  });
};

// CREAR UNA NUEVA RESERVA
const createReserva = (req, res) => {
  const { usuario_id, libro_id, fecha_reserva, fecha_devolucion, estado } = req.body;

  // Validación básica
  if (!usuario_id || !libro_id || !fecha_reserva || !fecha_devolucion) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  const createQuery = `INSERT INTO Reservas(usuario_id, libro_id, fecha_reserva, fecha_devolucion, estado) VALUES(?, ?, ?, ?, ?)`;
  const query = mysql2.format(createQuery, [usuario_id, libro_id, fecha_reserva, fecha_devolucion, estado || 'activa']);

  database.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ 
      message: 'Reserva creada exitosamente',
      id: result.insertId 
    });
  });
};

// ACTUALIZAR UNA RESERVA
const updateReserva = (req, res) => {
  const { id } = req.params;
  const { usuario_id, libro_id, fecha_reserva, fecha_devolucion, estado } = req.body;

  const updateQuery = `UPDATE Reservas SET usuario_id=?, libro_id=?, fecha_reserva=?, fecha_devolucion=?, estado=? WHERE id=?`;
  const query = mysql2.format(updateQuery, [usuario_id, libro_id, fecha_reserva, fecha_devolucion, estado, id]);

  database.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }
    res.json({ message: 'Reserva actualizada exitosamente' });
  });
};

// CANCELAR/ELIMINAR UNA RESERVA
const deleteReserva = (req, res) => {
  const { id } = req.params;

  const deleteQuery = `DELETE FROM Reservas WHERE id=?`;
  const query = mysql2.format(deleteQuery, [id]);

  database.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }
    res.json({ message: 'Reserva cancelada exitosamente' });
  });
};

module.exports = {
  createReserva,
  readReserva,
  listReservas,
  updateReserva,
  deleteReserva,
};