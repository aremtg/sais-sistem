
export interface TablasEstudiantes {
  message:  string;
  count:    number;
  students: Student[];
}
export interface Student {
  id:         string;
  cedula:     string;
  name:       string;
  lastname:   string;
  telefono:   string;
  email:      string;
  isActive:   boolean;
  createdAt:  Date;
  updatedAt:  Date;
  deletedAt:  null;
  teacher_id: null;
  teacher:    null;
  cursos:     any[];
  objetos:    Objeto[];
  createdBy:  string;
  updatedBy:  null | string;
  deletedBy:  null;
  usuario:    Usuario[];
}

export interface Objeto {
  id:          string;
  nombre:      string;
  descripcion: string;
  vehiculo:    string;
  articulos:   string;
  isActive:    boolean;
  createdAt:   Date;
  updatedAt:   Date;
  student_id:  string;
}

export interface Usuario {
  createbyuser?: Createbyuser;
  updatebyuser?: Updatebyuser;
}

export interface Createbyuser {
  usuario:      string;
  nombre:       string;
  createbyuser: Date;
}

export interface Updatebyuser {
  usuario:      string;
  nombre:       string;
  updatebyuser: Date;
}
// -------------------filtros de la tabla estudiantes ------------------------
export interface TablasFiltrosEstudiantes {
  cedula?:    string;
  teacher_id ? :  string;
  curso_id ? :  string;
}
// -----registro de estudiantes -----
export interface RegisterStudents {
  message:         string;
  student:         Student;
  userId:          UserID;
  cursosInscritos: number;
}

export interface Student {
  id:        string;
  cedula:    string;
  name:      string;
  lastname:  string;
  telefono:  string;
  email:     string;
  createdAt: Date;
  teacher:   null;
  cursos:    any[];
}

export interface UserID {
  id:            string;
  lastcreatedAt: Date;
}

// ---listado de profesores inscritos en el sistema ----
export interface ListadoProfesores {
  message:  string;
  teachers: Teacher[];
}

export interface Teacher {
  id:        string;
  cedula:    string;
  nombre:    string;
  apellido:  string;
  profesion: string;
}
// ---listado de cursos inscritos en el sistema ----
export interface ListadoCursos {
  message: string;
  cursos:  Curso[];
}

export interface Curso {
  id:          string;
  nombreCurso: string;
  codigo:      string;
}

