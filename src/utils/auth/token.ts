import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser } from "../../interfaces/user.interface";
import { AppError } from "../application.error";
import { httpStatus } from "../../config/httpStatusCodes";
// import { UserRepository } from "../../repositories/user.repository";
import { DecodedToken } from "../../interfaces/decodedToken.interface";
import { AuthUserDto } from "../../interfaces/authUser.interface";
import { AuthPayload } from "../../interfaces/AuthPayload.interface";

// const userRepository = new UserRepository();

function generateAccessToken(user: AuthUserDto) {
  if (!user.id) {
    throw new Error("User ID is missing while generating token.");
  }

  const payLoad = { userId: user.id };
  const secretKey = process.env.JWT_SECRET_KEY;

  if (!secretKey) {
    throw new Error("JWT Secret Key is not defined.");
  }

  const options = { expiresIn: "48h" }; // ✅ Usa "48h" en lugar de `3600 * 48`
  const token = jwt.sign(payLoad, secretKey, options);

  console.log("🔹 Token generado:", token); // 🔹 Debugging

  // ✅ Verificar si el token tiene 3 partes antes de devolverlo
  if (token.split(".").length !== 3) {
    console.error("🔴 ERROR: Token generado con formato incorrecto:", token);
  }

  return token;
}



function formatJwtTimestamp	(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleString("es-ES", { timeZone: "UTC" });
}

function parseJwt(token: string): DecodedToken {
  // ⚡jwt.decode ➡️ No verifica la firma del token, solo extrae su contenido (payload).
  /*
    ➡️ La conversión as DecodedToken | null indica que el resultado puede ser:
    ➡️ Un objeto con los datos del token  de tipo "DecodedToken"
    ➡️ null si el token es inválido o mal formado.
  */
  const decoded = jwt.decode(token) as DecodedToken | null;
  if (!decoded) {
        throw new AppError("Invalid Token", httpStatus.BAD_REQUEST);
  }
  return decoded;
}

const verifyToken = (token: string) => {
  if (!process.env.JWT_SECRET_KEY) {
    throw new AppError("JWT Secret Key is not defined", httpStatus.INTERNAL_SERVER_ERROR);
  }

  try {
    console.log("Usando JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY); // Debugging clave secreta

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY) as JwtPayload;
    console.log("Token decodificado en verifyToken:", decoded); // Debugging

    if (!decoded.hasOwnProperty("userId")) { // 🔹 Validar si el campo está presente
      throw new AppError("Invalid token payload: missing userId", httpStatus.UNAUTHORIZED);
    }

    return decoded as AuthPayload;
  } catch (error) {
    console.error("Error al verificar el token:", error); // Debugging
    throw new AppError("Invalid token", httpStatus.UNAUTHORIZED);
  }
};

/*
  💡 ¿Cuándo usar jwt.decode?
    ✅ Cuando solo necesitas ver el contenido del token, sin validar si es legítimo.
    ✅ Para debugging o inspeccionar datos sin necesidad de una clave secreta.
    ✅ Si confías en la fuente del token y solo necesitas extraer información rápidamente.

*/

export { generateAccessToken, formatJwtTimestamp, parseJwt, verifyToken };
