import cron from "node-cron";
import { ApiService } from "../apis/services";
import { AnalysisService } from "../analysis/services";
import { AnalysisRepository } from "../analysis/repository";
import { CAMPUS_IDS, PHASE_TYPES } from "../../utils/utils.constants";
import { CRON_SCHEDULE } from "../../environments/env";

export class CronJob {
  private apiService = new ApiService();
  private analysisService: AnalysisService;

  constructor() {
    const repository = new AnalysisRepository();
    this.analysisService = new AnalysisService(repository);
  }

  start() {
    cron.schedule(CRON_SCHEDULE, async () => {
      console.log("Running cron job...");

      for (const campusId of CAMPUS_IDS) {
        for (const phaseType of PHASE_TYPES) {
          try {
            let biometricType: string = "WEIGHT_GROUP";
            if (phaseType === "ADULT") {
              biometricType = "COMMERCIAL_SIZES";
            }
            const date = new Date().toISOString().split("T")[0]; // Fecha del día
            const data = await this.apiService.fetchData(
              campusId,
              phaseType,
              biometricType,
              date
            );

            if (data && data.length > 0) {
              console.log(
                `Data fetched for campusId ${campusId} and phaseType ${phaseType}:`,
                data
              );
              await this.analysisService.saveAnalysis(data); // Guardar datos en la BD
              console.log("Data successfully saved.");
            } else {
              console.log("No data to save.");
            }
          } catch (error) {
            console.error(
              `Error processing campusId ${campusId} and phaseType ${phaseType}:`,
              error
            );
          }
        }
      }
    });
  }
}
