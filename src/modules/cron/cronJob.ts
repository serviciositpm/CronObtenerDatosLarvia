import cron from "node-cron";
import { ApiService } from "../apis/services";
import { AnalysisService } from "../analysis/services";
import { AnalysisRepository } from "../analysis/repository";
import { CAMPUS_IDS, PHASE_TYPES } from "../../utils/utils.constants";
import { CRON_SCHEDULE, TIME_ZONE } from "../../environments/env";

export class CronJob {
  private apiService = new ApiService();
  private analysisService: AnalysisService;

  constructor() {
    const repository = new AnalysisRepository();
    this.analysisService = new AnalysisService(repository);
  }

  start() {
    cron.schedule(
      CRON_SCHEDULE,
      async () => {
        const fecha_actual = new Date();
        const datosFecha = fecha_actual
          .toISOString()
          .replace("T", " ")
          .split(".")[0];
        console.log("🚀🚀🚀 Ejecución Iniciada...........", datosFecha);

        for (const campusId of CAMPUS_IDS) {
          for (const phaseType of PHASE_TYPES) {
            try {
              let biometricType: string = "WEIGHT_GROUP"; // phaseType === "ADULT" ? "COMMERCIAL_SIZES" : "WEIGHT_GROUP";
              const date = new Date().toISOString().split("T")[0];

              const data = await this.apiService.fetchData(
                campusId,
                phaseType,
                biometricType,
                date
              );

              if (!data || data.length === 0) {
                console.warn(
                  `⚠️ No data found for campusId ${campusId} and phaseType ${phaseType}`
                );
                continue; // Evitar procesar datos vacíos
              }

              console.log(
                `🫣⌛⌛ Procesando datos para campusId ${campusId} y phaseType ${phaseType}:`,
                data
              );

              await this.analysisService.saveAnalysis(data);
              console.log("✅ Datos Guardados Satisfactoriamente.");
            } catch (error) {
              console.error(
                `❌ Error al procesar  campusId ${campusId} and phaseType ${phaseType}:`,
                error
              );
            }
          }
        }
      },
      {
        scheduled: true,
        timezone: TIME_ZONE,
      }
    );
    console.log("✅ Cron programado para ejecutarse a las 23:00 todos los días.");
  }
}
