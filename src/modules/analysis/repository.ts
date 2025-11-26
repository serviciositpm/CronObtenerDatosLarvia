import sql from "mssql";
import { AnalysisData } from "../../interfaces/Analisys.Interface";
import dbConfig from "../../config/dbConfig";

export class AnalysisRepository {
  async insertHeader(data: AnalysisData, spname: string): Promise<number> {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input("campusName", sql.VarChar(100), data.campusName)
        .input("stockingName", sql.VarChar(50), data.stockingName)
        .input("tankName", sql.VarChar(50), data.tankName)
        .input("analysisDate", sql.DateTime, data.analysisDate)
        .input("productionDays", sql.Int, data.productionDays)
        .input("population", sql.Int, data.population)
        .input("survivalRate", sql.Float, data.survivalRate)
        .input("uniformityWeight", sql.Float, data.uniformityWeight)
        .input("avgWeight", sql.Float, data.averageWeight.value)
        .input("avgWeightUnit", sql.VarChar(20), data.averageWeight.unit)
        .input("weightIncrease", sql.Float, data.weightIncrease.value)
        .input("weightIncreaseUnit", sql.VarChar(20), data.weightIncrease.unit)
        .input("weightIncreaseValue", sql.Float, data.weightIncrease.value)
        .input("weightIncreaseDays", sql.Int, data.weightIncrease.days)
        .input("biomassValue", sql.Float, data.biomassLb?.value || 0)
        .input("biomassUnit", sql.VarChar(20), data.biomassLb?.unit || "Lb")
        .input("size", sql.Float, data.size.value)
        .input("sizeUnit", sql.VarChar(20), data.size.unit)
        .input("density", sql.Float, data.density.value)
        .input("densityUnit", sql.VarChar(20), data.density.unit)
        .input("stockingType", sql.VarChar(40), data.stockingType)
        .output("idInserted", sql.Int) // Variable de salida para el ID insertado
        .execute(spname); // Llamado al SP

      return result.output.idInserted as number;
    } catch (error) {
      console.error("Error inserting analysis header:", error);
      throw error;
    }
  }

  async insertDetail(
    headerId: number,
    type: string,
    keyName: string,
    rangeValue: string,
    animals: number,
    biomass: number
  ): Promise<void> {
    try {
      const pool = await sql.connect(dbConfig);
      await pool
        .request()
        .input("headerId", sql.Int, headerId)
        .input("type", sql.VarChar(50), type)
        .input("keyName", sql.VarChar(100), keyName)
        .input("rangeValue", sql.VarChar(50), rangeValue)
        .input("animals", sql.Int, animals)
        .input("biomass", sql.Float, biomass)
        .execute("Sp_Larvia_Inserta_Detalle_Analisis"); // Llamado al SP
    } catch (error) {
      console.error("Error inserting analysis detail:", error);
      throw error;
    }
  }
  async insertDetailWeightGroup(
    headerId: number,
    rangeValue: string ,
    animalsCount:number 		,
    animalsPercent:number 			,
    biomassKgWeight:number			,
    biomassKgPercent:number 			,
    biomassLbWeight:number 			,
    biomassLbPercent:number 			,
    averageWeight:number 		  ): Promise<void> {
    try {
      const pool = await sql.connect(dbConfig);
      await pool
        .request()
        .input("headerId", sql.Int, headerId)
        .input("rangeValue", sql.VarChar(50), rangeValue)
        .input("animalsCount", sql.Int, animalsCount)
        .input("animalsPercent", sql.Float, animalsPercent)
        .input("biomassKgWeight", sql.Float, biomassKgWeight)
        .input("biomassKgPercent", sql.Float, biomassKgPercent)
        .input("biomassLbWeight", sql.Float, biomassLbWeight)
        .input("biomassLbPercent", sql.Float, biomassLbPercent)
        .input("averageWeight", sql.Float, averageWeight)
        .execute("Sp_Larvia_Inserta_Detalle_Analisis_WeightGroup"); // Llamado al SP
    } catch (error) {
      console.error("Error inserting analysis detail WeightGroup:", error);
      throw error;
    }
  }
}
