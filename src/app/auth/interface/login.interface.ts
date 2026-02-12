export interface Login {
  message: string;
  usuario: Usuario;
  token:   Token;
}

export interface Token {
  token:        string;
  refreshToken: string;
}
// ------------------------------------
export interface Usuario {
  cedula:   string;
  nombre:   string;
  apellido: string;
  email:    string;
  imagen:   null;
  role:     string;
  isActive: boolean;
}
// las tablas de usuarios --------------------------------
export interface Tablas {
  message:  string;
  usuarios: Usuario[];
  total:    number;
  page:     number;
  limit:    number;
}

export interface Usuario {
  id:        string;
  cedula:    string;
  nombre:    string;
  email:     string;
  imagen:    null ;
  role:      string;
  isActive:  boolean;
  createdAt: Date;
}

// ------------------------------------------------------------
export interface tablasfitros{
  cedula?:    string;
  email?:     string;
  role ? :  string;
  page: number;
  limit: number;
}
// -------registrar usuaarios----------------------
export interface Register {
  message: string;
  usuario: Usuario;
}
export interface Usuario {
  cedula:   string;
  nombre:   string;
  apellido: string;
  email:    string;
  imagen:   null;
  role:     string;
  isActive: boolean;
}

// -------- pefil de usuarios ------
export interface PerfilUsers {
  perfil: Perfil;
}

export interface Perfil {
  id:        string;
  cedula:    string;
  nombre:    string;
  apellido:  string;
  email:     string;
  imagen:    string;
  role:      string;
  isActive:  boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
}



