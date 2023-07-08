// Importación de módulos y rutas necesarias
import express from "express"
import estudiantesRoutes from "./routes/estudiantes.routes.js"
import profesoresRoutes from "./routes/profesores.routes.js"
import cursosRoutes from "./routes/cursos.routes.js"
import estudiantesCursosRoutes from './routes/estudiantescursos.routes.js'

// Crear una instancia de la aplicación Express
const app = express()

// Analizar las solicitudes entrantes con carga útil JSON
app.use(express.json())

// Definir las rutas
app.use("/api", estudiantesRoutes)
app.use("/api", profesoresRoutes)
app.use("/api", cursosRoutes)
app.use('/api',estudiantesCursosRoutes)

// Middleware para manejar rutas desconocidas
app.use((req, res, next) => {
    res.status(400).json({
        mensaje: "Ruta no encontrada"
    })
})

// Iniciar el servidor
app.listen(3000) // El servidor escucha en el puerto 3000
console.log("Server esta corriendo en le puerto 3000") // Mostrar un mensaje que indica que el servidor está en ejecución