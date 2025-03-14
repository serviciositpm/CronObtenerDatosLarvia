export interface AnalysisData {
    campusName: string;
    stockingName: string;
    tankName: string;
    analysisDate: string;
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
    biomass: {
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
      biomassKg: { weight: number; percent: number };
      biomassLb: { weight: number; percent: number };
      averageWeight: number;
    }>;
  }
  