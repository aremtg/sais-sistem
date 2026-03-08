export interface RegistroCurso {
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
//  los teacher del programa
export interface GetTeacher {
  message: string;
  teacher: Teacher[];
}

export interface Teacher {
  id:        string;
  cedula:    string;
  nombre:    string;
  apellido:  string;
  profesion: string;
  rama:      string;
}

// tablas
export interface TablasCurso {
  message: string;
  cursos:  Curso[];
  total:   number;
  limit:   number;
  pages:   number;
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
  students:    any[];
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
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
}
// filtros del curso
export interface filtrosCursos {
  nombreCurso ?: string;
  codigo? :  string;
  teacher_id ?  : string;
  pages : number;
  limit : number;
}
