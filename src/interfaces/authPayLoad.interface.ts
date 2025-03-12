import { JwtPayload } from "jsonwebtoken";

export interface AuthPayload extends JwtPayload {
    userId: string; // Aseguramos que siempre tenga un id
}
