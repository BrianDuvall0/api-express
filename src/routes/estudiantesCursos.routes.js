import { Router } from "express";
import { verEstudiantesCursos, verCursosEstudiantes, crearEstudiantesCursos, eliminarEstudiantesCurso} from "../controllers/estudiantesCursos.controllers.js"
const router = Router();

// Ruta para obtener los cursos de un estudiante específico
router.get('/estudiantes/cursos/:estudiante_id', verEstudiantesCursos);

// Ruta para obtener los estudiantes de un curso específico
router.get('/cursos/estudiantes/:curso_id', verCursosEstudiantes);

// Ruta para crear una relación entre un curso y un estudiante
router.post('/cursos/:curso_id/estudiantes', crearEstudiantesCursos);

// Ruta para eliminar una relación entre un curso y un estudiante
router.delete('/cursos/:curso_id/estudiantes/:estudiante_id', eliminarEstudiantesCurso);

export default router