import sql from "mssql";
import { AnalysisData } from "../../interfaces/Analisys.Interface";
import dbConfig from "../../config/dbConfig";

export class AnalysisRepository {
  async insertHeader(data: AnalysisData): Promise<number> {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input("campusName", data.campusName)
        .input("stockingName", data.stockingName)
        .input("tankName", data.tankName)
        .input("analysisDate", data.analysisDate)
        .input("avgWeight", data.averageWeight.value)
        .input("avgWeightUnit", data.averageWeight.unit)
        .input("weightIncrease", data.weightIncrease.value)
        .input("weightIncreaseUnit", data.weightIncrease.unit)
        .input("weightIncreaseDays", data.weightIncrease.days)
        .input("productionDays", data.productionDays)
        .input("population", data.population)
        .input("survivalRate", data.survivalRate)
        .input("uniformityWeight", data.uniformityWeight)
        .input("biomass", data.biomass.value)
        .input("biomassUnit", data.biomass.unit)
        .input("size", data.size.value)
        .input("sizeUnit", data.size.unit)
        .input("density", data.density.value)
        .input("densityUnit", data.density.unit).query(`
                INSERT INTO AnalysisHeader (
                    campusName, stockingName, tankName, analysisDate, avgWeight, avgWeightUnit,
                    weightIncrease, weightIncreaseUnit, weightIncreaseDays, productionDays,
                    population, survivalRate, uniformityWeight, biomass, biomassUnit,
                    size, sizeUnit, density, densityUnit
                ) 
                OUTPUT INSERTED.id
                VALUES (
                    @campusName, @stockingName, @tankName, @analysisDate, @avgWeight, @avgWeightUnit,
                    @weightIncrease, @weightIncreaseUnit, @weightIncreaseDays, @productionDays,
                    @population, @survivalRate, @uniformityWeight, @biomass, @biomassUnit,
                    @size, @sizeUnit, @density, @densityUnit
                )
            `);
      return result.recordset[0].id;
    } catch (error) {
      console.error(
        "Error fetching data for campusId ${campusId} and phaseType ${phaseType}:",
        error
      );
      throw error;
    }
  }

  async insertDetail(
    headerId: number,
    category: string,
    keyName: string,
    range: string,
    animals: number,
    biomass: number
  ) {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("analysisHeaderId", headerId)
      .input("category", category)
      .input("keyName", keyName)
      .input("rangeValue", range)
      .input("animals", animals)
      .input("biomass", biomass).query(`
                INSERT INTO AnalysisDetail (analysisHeaderId, category, keyName, rangeValue, animals, biomass)
                VALUES (@analysisHeaderId, @category, @keyName, @rangeValue, @animals, @biomass)
            `);
  }
}
