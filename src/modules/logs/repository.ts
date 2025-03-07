import LogModel from "./models";
export class LogRepository {
  async saveLog(level: string, message: string, meta?: object): Promise<void> {
    try {
      const log = new LogModel({ level, message, meta });
      await log.save();
    } catch (error) {
      console.error(
        "Error en Guardado de logs en Mongo en el Repository:",
        error
      ); // Registrar el error en la consola
      throw error;
    }
  }

  async getLogs(limit: number = 100): Promise<any[]> {
    try {
      return await LogModel.find().sort({ timestamp: -1 }).limit(limit);
    } catch (error) {
      console.error(
        "Error en Obtención de logs en Mongo en el Repository:",
        error
      ); //
      return [];
    }
  }
}
