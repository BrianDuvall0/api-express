import { Router } from "express";
import { verEstudiantes, creandoEstudiante, actualizarEstudiante, eliminarEstudiante, verEstudiante } from "../controllers/estudiantes.controllers.js";

const router = Router()

// Ruta para obtener todos los estudiantes
router.get("/estudiantes", verEstudiantes)

// Ruta para obtener un estudiante específico por su ID
router.get("/estudiantes/:id", verEstudiante)

// Ruta para crear un nuevo estudiante
router.post("/estudiantes", creandoEstudiante)

// Ruta para actualizar la información de un estudiante específico por su ID
router.patch("/estudiantes/:id", actualizarEstudiante)

// Ruta para eliminar un estudiante específico por su ID
router.delete("/estudiantes/:id", eliminarEstudiante)

export default router