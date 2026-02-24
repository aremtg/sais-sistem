export interface CreateTeacher {
  message:         string;
  teacher:         Teacher;
  cursosAsociados: number;
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
  students:  any[];
  cursos:    Curso[] | any[];
}
// tablas de profesores
export interface TablasdeProfesores {
  message:  string;
  teachers: Teacher[];
  total:    number;
  limit:    number;
  page:     number;
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
  students:  any[];
  cursos:    Curso[] | any[];
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
  teacher_id:  string;
}
export interface TablasFiltroProfesores {
  cedula? : string;
  nombre? : string;
  curso_id? : string;
  page : number;
  limit: number;
}

