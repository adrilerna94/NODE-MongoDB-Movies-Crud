// Interfaz para el contenido del token decodificado
export interface DecodedToken {
  userId: string;
  iat: number;
  exp: number;
};
