CREATE DATABASE IF NOT EXISTS escueladb;

show databases;

USE escueladb;

CREATE TABLE estudiantes (
    estudiante_id INT(11) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(45) DEFAULT NULL,
    edad INT(5) DEFAULT NULL,
    grado VARCHAR(45) DEFAULT NULL,
    PRIMARY KEY (estudiante_id)
);

CREATE TABLE profesores (
    profesor_id INT(11) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(45) DEFAULT NULL,
    especialidad VARCHAR(45) DEFAULT NULL,
    email VARCHAR(45) DEFAULT NULL,
    PRIMARY KEY (profesor_id)
);

CREATE TABLE cursos (
    curso_id INT(11) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(45) DEFAULT NULL,
    descripcion VARCHAR(45) DEFAULT NULL,
    PRIMARY KEY (curso_id)
);

CREATE TABLE estudiantes_cursos (
    id INT(11) NOT NULL AUTO_INCREMENT,
    estudiante_id INT(11) DEFAULT NULL,
    curso_id INT(11) DEFAULT NULL,
    FOREIGN KEY (estudiante_id) REFERENCES estudiantes(estudiante_id),
    FOREIGN KEY (curso_id) REFERENCES cursos(curso_id),
    PRIMARY KEY (id)
);

show tables;

describe estudiantes;

describe profesores;

describe cursos;

describe estudiantes_cursos;

INSERT INTO estudiantes VALUES
    (1, "Brian", 23, "programación"),
    (2, "Fabio", 28, "backend"),
    (3, "Maxi", 28, "backend"),
    (4, "Franco", 22, "frontend");

select * from estudiantes;

INSERT INTO profesores VALUES
    (1, "Alejandro", "programación", "alejandro@gmail.com"),
    (2, "Alejandro", "backend", "alejandro@gmail.com"),
    (3, "Javier", "frontend", "javier@gmail.com");

select * from profesores;

INSERT INTO cursos VALUES
    (1, "programación", "logica de algoritmos"),
    (2, "backend", "apis y bases de datos"),
    (3, "frontend", "interfaces de usuarios");

select * from cursos;

Crud estudiantes:

//Ver todos los estudiantes: GET:
SELECT * FROM estudiantes;

//Ver un solo estudiante: GET:
SELECT * FROM estudiantes WHERE id = 1;

//Crear un estudiante: POST:
INSERT INTO estudiantes VALUES (nombre, edad, grado);

//Eliminar un estudiante: DELETE:
DELETE FROM estudiantes WHERE id = 1;

//Actualiza estudiante: PATCH:
UPDATE estudiantes SET nombre = IFNULL(nombre), edad = IFNULL(edad), grado = IFNULL(grado) WHERE id = 1;

Crud profesores:

//Ver todos los profesores: GET:
SELECT * FROM profesores;

//Ver un solo profesor: GET:
SELECT * FROM profesores WHERE id = 1;

//Crear un profesor: POST:
INSERT INTO profesores VALUES (nombre, especialidad, email);

//Eliminar un profesor: DELETE:
DELETE FROM profesores WHERE id = 1;

//Actualiza profesor: PATCH:
UPDATE profesores SET nombre = IFNULL(nombre), especialidad = IFNULL(especialidad), email = IFNULL(email) WHERE id = 1;

Crud cursos:

//Ver todos los cursos: GET:
SELECT * FROM cursos;

//Ver un solo curso: GET:
SELECT * FROM cursos WHERE id = 1;

//Crear un curso: POST:
INSERT INTO cursos VALUES (nombre, descripcion);

//Eliminar un curso: DELETE:
DELETE FROM cursos WHERE id = 1;

//Actualiza curso: PATCH:
UPDATE cursos SET nombre = IFNULL(nombre), descripcion = IFNULL(descripcion) WHERE id = 1;

CREATE TABLE estudiantes_cursos (
  id INT(11) NOT NULL AUTO_INCREMENT,
  estudiante_id INT(11) DEFAULT NULL,
  curso_id INT(11) DEFAULT NULL,
  FOREIGN KEY (estudiante_id) REFERENCES estudiantes(estudiante_id),
  FOREIGN KEY (curso_id) REFERENCES cursos(curso_id)
);
