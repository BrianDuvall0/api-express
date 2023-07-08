import { pool } from "../db.js";
import { validationResult } from 'express-validator';
import { body } from 'express-validator';

// Obtener todos los cursos de un estudiante específico
export const verCursosEstudiantes = async (req, res) => {
    try {
        const [rows] = await pool.query(`
        SELECT cursos.*
        FROM estudiantes_cursos
        JOIN cursos ON estudiantes_cursos.curso_id = cursos.curso_id
        WHERE estudiantes_cursos.estudiante_id = ?`,[req.params.estudiante_id]
        );

        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            mensaje: "Algo salió mal",
            error: error
        });
    }
};

// Obtener todos los estudiantes de un curso específico
export const verEstudiantesCursos = async (req, res) => {
    try {
        const [rows] = await pool.query(`
        SELECT estudiantes.*
        FROM estudiantes_cursos
        JOIN estudiantes ON estudiantes_cursos.estudiante_id = estudiantes.estudiante_id
        WHERE estudiantes_cursos.curso_id = ?`,[req.params.curso_id]
        );

        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            mensaje: "Algo salió mal",
            error: error
        });
    }
};

// Crear una relación entre un estudiante y un curso
export const crearEstudiantesCursos = async (req, res) => {
    const { estudiante_id, curso_id } = req.body;

    try {
        // Validaciones
        await body('estudiante_id').notEmpty().withMessage('El campo "estudiante_id" es obligatorio').isInt().withMessage('El campo "estudiante_id" debe ser un número entero').run(req);
        await body('curso_id').notEmpty().withMessage('El campo "curso_id" es obligatorio').isInt().withMessage('El campo "curso_id" debe ser un número entero').run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const [rows] = await pool.query('INSERT INTO estudiantes_cursos (estudiante_id, curso_id) VALUES (?, ?)', [estudiante_id, curso_id]);
        res.send({ 
            id: rows.insertId,
            estudiante_id,
            curso_id
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Algo salió mal",
            error: error
        });
    }
};

// Eliminar una relación entre un estudiante y un curso
export const eliminarEstudiantesCurso = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM estudiantes_cursos WHERE estudiante_id = ? AND curso_id = ?', [req.params.estudiante_id, req.params.curso_id]);

        if (result.affectedRows <= 0) {
            return res.status(404).json({
                mensaje: 'No existe'
            });
        }

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            mensaje: "Algo salió mal"
        });
    }
};
