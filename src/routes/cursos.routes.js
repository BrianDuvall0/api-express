import { Router } from "express";
import { verCursos, creandoCurso, actualizarCurso, eliminarCurso, verCurso } from "../controllers/cursos.controllers.js";

const router = Router();

// Ruta para obtener todos los cursos
router.get("/cursos", verCursos);

// Ruta para obtener un curso específico por su ID
router.get("/cursos/:id", verCurso);

// Ruta para crear un nuevo curso
router.post("/cursos", creandoCurso);

// Ruta para actualizar la información de un curso específico por su ID
router.patch("/cursos/:id", actualizarCurso);

// Ruta para eliminar un curso específico por su ID
router.delete("/cursos/:id", eliminarCurso);

export default router;