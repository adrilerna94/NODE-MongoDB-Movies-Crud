import bcrypt from 'bcrypt';
import { IRegister } from '../../types/register.interface';

export const hashPassword = async (userData: IRegister) => {
  /*
    bcrypt.genSalt(10) crea una salt (cadena aleatoria) con 10 rondas de generación.
    La salt sirve para fortalecer el hash y prevenir ataques como rainbow tables.
  */
  const salt = await bcrypt.genSalt(10);
  // 🔑 bcrypt ➡️ cifra contraseña antes de guardarla usando el salt generado
  const hashedPassword = await bcrypt.hash(userData.password,salt);
  return hashedPassword;
  //Cada vez que ejecutes la función, la contraseña será diferente porque el salt es aleatorio.
}
