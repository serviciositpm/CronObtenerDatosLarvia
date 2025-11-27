export interface AnalysisData {
  campusName: string;
  stockingName: string;
  tankName: string;
  analysisDate: string;
  stockingType: string;
  averageWeight: {
    value: number;
    unit: string;
  };
  weightIncrease: {
    value: number;
    unit: string;
    days: number;
  };
  productionDays: number;
  population: number;
  survivalRate: number;
  uniformityWeight: number;
  biomassKg: {
    // Nuevo campo en el JSON
    value: number;
    unit: string;
  };
  biomassLb: {
    // Nuevo campo en el JSON
    value: number;
    unit: string;
  };
  size: {
    value: number;
    unit: string;
  };
  density: {
    value: number;
    unit: string;
  };
  observations: Array<{ key: string; value: number }>;
  wholeData: Array<{ range: string; animals: number; biomass: number }>;
  tailData: Array<{ range: string; animals: number; biomass: number }>;
  weightGroupData: Array<{
    range: string;
    animals: { count: number; percent: number };
    biomass: { weight: number; percent: number; unit: string };
    /* biomassKg: { weight: number; percent: number };
      biomassLb: { weight: number; percent: number }; */
    averageWeight: { value : number, unit: string};
  }>;
}
