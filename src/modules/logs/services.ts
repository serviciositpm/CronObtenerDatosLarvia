import { LogRepository } from "./repository";

export class LogService {
  private logRepository: LogRepository;

  constructor() {
    this.logRepository = new LogRepository();
  }

  async logInfo(message: string, meta?: object): Promise<void> {
    try {
      await this.logRepository.saveLog("info", message, meta);
    } catch (error) {
      console.error("Error en logInfo:", error);
      throw error;
    }
  }

  async logError(message: string, meta?: object): Promise<void> {
    try {
      await this.logRepository.saveLog("error", message, meta);
    } catch (error) {
      console.error("Error en logError:", error);
      throw error;
    }
  }

  async logWarn(message: string, meta?: object): Promise<void> {
    try {
      await this.logRepository.saveLog("warn", message, meta);
    } catch (error) {
      console.error("Error en logWarn:", error);
      throw error;
    }
  }

  async getRecentLogs(limit: number = 100): Promise<any[]> {
    try {
      return await this.logRepository.getLogs(limit);
    } catch (error) {
      console.error("Error en getRecentLogs:", error);
      return [];
    }
  }
}
