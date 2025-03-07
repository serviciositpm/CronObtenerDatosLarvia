import mongoose, { Schema } from 'mongoose';
import { ILog } from '../../interfaces/Losgs.Interface';


const LogSchema = new Schema<ILog>({
    level: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    meta: { type: Object }
});

// Especificando la colección "logs"
const LogModel = mongoose.model<ILog>('Log', LogSchema, 'logsCronLarvia');
export default LogModel;
