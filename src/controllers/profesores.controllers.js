import { pool } from "../db.js";
import { validationResult } from 'express-validator';
import { body } from 'express-validator';

// Controlador para obtener todos los profesores
export const verProfesores = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM profesores");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            mensaje: "Algo salió mal"
        });
    }
};

// Controlador para obtener un profesor específico por su ID
export const verProfesor = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM profesores WHERE profesores_id = ?", [req.params.id]);

        if (rows.length <= 0) {
            return res.status(404).json({
                mensaje: "Profesor no encontrado"
            });
        }

        console.log(rows);
        res.send(rows[0]);
    } catch (error) {
        return res.status(500).json({
            mensaje: "Algo salió mal"
        });
    }
};

// Controlador para crear un nuevo profesor
export const creandoProfesor = async (req, res) => {
    try {
        // Validaciones
        await body('nombre').notEmpty().withMessage('El campo "nombre" es obligatorio').run(req);
        await body('especialidad').notEmpty().withMessage('El campo "especialidad" es obligatorio').run(req);
        await body('email').notEmpty().withMessage('El campo "email" es obligatorio').run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { nombre, especialidad, email } = req.body;
        const [rows] = await pool.query("INSERT INTO profesores(nombre, especialidad, email) VALUES (?, ?, ?)", [nombre, especialidad, email]);
        console.log(req.body);
        res.send({
            id: rows.insertId,
            nombre,
            especialidad,
            email,
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Algo salió mal"
        });
    }
};

// Controlador para eliminar un profesor específico por su ID
export const eliminarProfesor = async (req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM profesores WHERE profesores_id = ?", [req.params.id]);

        if (result.affectedRows <= 0) {
            return res.status(404).json({
                mensaje: "Profesor no encontrado"
            });
        }

        res.send(204);
    } catch (error) {
        return res.status(500).json({
            mensaje: "Algo salió mal"
        });
    }
};

// Controlador para actualizar la información de un profesor específico por su ID
export const actualizarProfesor = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, especialidad, email } = req.body;

        const [result] = await pool.query("UPDATE profesores SET nombre = IFNULL(?, nombre), especialidad = IFNULL(?, especialidad), email = IFNULL(?, email) WHERE profesores_id = ?",
            [nombre, especialidad, email, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "Profesor no encontrado"
            });
        }

        const [rows] = await pool.query("SELECT * FROM profesores WHERE profesores_id = ?", [id]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            mensaje: "Algo salió mal"
        });
    }
};
