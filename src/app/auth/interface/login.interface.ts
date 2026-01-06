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
}

export interface Usuario {
  id:        string;
  cedula:    string;
  nombre:    string;
  email:     string;
  role:      string;
  isActive:  boolean;
  createdAt: Date;
}
// ------------------------------------------------------------
export interface tablasfitros{
  cedula?:    string;
  email?:     string;
  role ? :  string;
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
// ------------------------------
