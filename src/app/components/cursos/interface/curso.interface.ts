export interface RegistreCurso {
  message: string;
  curso:   Curso;
}

export interface Curso {
  id:          string;
  nombreCurso: string;
  codigo:      string;
  descripcion: string;
  isActive:    boolean;
  createdAt:   Date;
  updatedAt:   Date;
  deletedAt:   null;
  teacher:     Teacher;
  teacher_id:  string;
}

export interface Teacher {
  id:        string;
  cedula:    string;
  nombre:    string;
  apellido:  string;
  profesion: string;
  rama:      string;
  jornada:   string;
  email:     string;
  telefono:  string;
}
//  tablas de cursos
