import { pool } from "../db.js";
import { validationResult } from 'express-validator';
import { body } from 'express-validator';

// Controlador para obtener todos los estudiantes
export const verEstudiantes = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM estudiantes");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            mensaje: "Algo salió mal"
        });
    }
};

// Controlador para obtener un estudiante específico por su ID
export const verEstudiante = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM estudiantes WHERE estudiante_id = ?", [req.params.id]);

        if (rows.length <= 0) {
            return res.status(404).json({
                mensaje: "Estudiante no encontrado"
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

// Controlador para crear un nuevo estudiante
export const creandoEstudiante = async (req, res) => {
    try {
        // Validaciones
        await body('nombre').notEmpty().withMessage('El campo "nombre" es obligatorio').run(req);
        await body('edad').notEmpty().withMessage('El campo "edad" es obligatorio').isInt().withMessage('El campo "edad" debe ser un número entero').run(req);
        await body('grado').notEmpty().withMessage('El campo "grado" es obligatorio').run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { nombre, edad, grado } = req.body;
        const [rows] = await pool.query("INSERT INTO estudiantes(nombre, edad, grado) VALUES (?, ?, ?)", [nombre, edad, grado]);
        console.log(req.body);
        res.send({
            id: rows.insertId,
            nombre,
            edad,
            grado,
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Algo salió mal"
        });
    }
};

// Controlador para eliminar un estudiante específico por su ID
export const eliminarEstudiante = async (req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM estudiantes WHERE estudiante_id = ?", [req.params.id]);

        if (result.affectedRows <= 0) {
            return res.status(404).json({
                mensaje: "Estudiante no encontrado"
            });
        }

        res.send(204);
    } catch (error) {
        return res.status(500).json({
            mensaje: "Algo salió mal"
        });
    }
};

// Controlador para actualizar la información de un estudiante específico por su ID
export const actualizarEstudiante = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, edad, grado } = req.body;

        const [result] = await pool.query("UPDATE estudiantes SET nombre = IFNULL(?, nombre), edad = IFNULL(?, edad), grado = IFNULL(?, grado) WHERE estudiante_id = ?",
            [nombre, edad, grado, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "Estudiante no encontrado"
            });
        }

        const [rows] = await pool.query("SELECT * FROM estudiantes WHERE estudiante_id = ?", [id]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            mensaje: "Algo salió mal"
        });
    }
};
