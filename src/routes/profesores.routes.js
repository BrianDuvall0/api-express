import { Router } from "express";
import { verProfesores, creandoProfesor, actualizarProfesor, eliminarProfesor, verProfesor } from "../controllers/profesores.controllers.js";

const router = Router();

// Ruta para obtener todos los profesores
router.get("/profesores", verProfesores);

// Ruta para obtener un profesor específico por su ID
router.get("/profesores/:id", verProfesor);

// Ruta para crear un nuevo profesor
router.post("/profesores", creandoProfesor);

// Ruta para actualizar la información de un profesor específico por su ID
router.patch("/profesores/:id", actualizarProfesor);

// Ruta para eliminar un profesor específico por su ID
router.delete("/profesores/:id", eliminarProfesor);

export default router;