export interface Login {
  message: string;
  usuario: Usuario;
  token:   Token;
}

export interface Token {
  token:        string;
  refreshToken: string;
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
