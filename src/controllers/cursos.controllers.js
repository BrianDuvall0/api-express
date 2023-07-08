import { pool } from "../db.js";
import { validationResult } from 'express-validator';
import { body } from 'express-validator';

// Controlador para obtener todos los cursos
export const verCursos = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM cursos");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            mensaje: "Algo salió mal"
        });
    }
};

// Controlador para obtener un curso específico por su ID
export const verCurso = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM cursos WHERE curso_id = ?", [req.params.id]);

        if (rows.length <= 0) {
            return res.status(404).json({
                mensaje: "Curso no encontrado"
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

// Controlador para crear un nuevo curso
export const creandoCurso = async (req, res) => {
    try {
        // Validaciones
        await body('nombre').notEmpty().withMessage('El campo "nombre" es obligatorio').run(req);
        await body('descripcion').notEmpty().withMessage('El campo "descripcion" es obligatorio').run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { nombre, descripcion } = req.body;
        const [rows] = await pool.query("INSERT INTO cursos(nombre, descripcion) VALUES (?, ?)", [nombre, descripcion]);
        console.log(req.body);
        res.send({
            id: rows.insertId,
            nombre,
            descripcion,
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Algo salió mal"
        });
    }
};

// Controlador para eliminar un curso específico por su ID
export const eliminarCurso = async (req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM cursos WHERE curso_id = ?", [req.params.id]);

        if (result.affectedRows <= 0) {
            return res.status(404).json({
                mensaje: "Curso no encontrado"
            });
        }

        res.send(204);
    } catch (error) {
        return res.status(500).json({
            mensaje: "Algo salió mal"
        });
    }
};

// Controlador para actualizar la información de un curso específico por su ID
export const actualizarCurso = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;

        const [result] = await pool.query("UPDATE cursos SET nombre = IFNULL(?, nombre), descripcion = IFNULL(?, descripcion) WHERE curso_id = ?",
            [nombre, descripcion, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "Curso no encontrado"
            });
        }

        const [rows] = await pool.query("SELECT * FROM cursos WHERE curso_id = ?", [id]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            mensaje: "Algo salió mal"
        });
    }
};