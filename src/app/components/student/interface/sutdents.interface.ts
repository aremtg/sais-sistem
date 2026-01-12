
export interface TablasEstudiantes {
  message:  string;
  count:    number;
  students: Student[];
}
export interface TablasFiltrosEstudiantes {
  cedula?:    string;
  teacher_id ? :  string;
  curso_id ? :  string;
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
