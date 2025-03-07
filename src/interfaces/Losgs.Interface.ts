
import { Document } from 'mongoose';
export interface ILog extends Document {
    level: string;
    message: string;
    timestamp: Date;
    meta?: Record<string, unknown>; // Datos adicionales (ej. usuario, IP, etc.)
}