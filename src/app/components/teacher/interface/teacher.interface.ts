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
  cursos:    any[];
}
