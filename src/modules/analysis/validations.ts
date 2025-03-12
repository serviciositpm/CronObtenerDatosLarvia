import { AnalysisData } from "../../interfaces/Analisys.Interface";

export function validateAndNormalizeAnalysisData(data: AnalysisData[]): AnalysisData[] {
    return data.map((analysis) => {
        // Validación y normalización de propiedades simples
        analysis.campusName = analysis.campusName ?? '';
        analysis.stockingName = analysis.stockingName ?? '';
        analysis.tankName = analysis.tankName ?? '';
        analysis.analysisDate = analysis.analysisDate ?? '';
        analysis.productionDays = analysis.productionDays ?? 0;
        analysis.population = analysis.population ?? 0;
        analysis.survivalRate = analysis.survivalRate ?? 0;
        analysis.uniformityWeight = analysis.uniformityWeight ?? 0;

        // Validación y normalización de objetos dentro de la propiedad
        analysis.averageWeight.value = analysis.averageWeight.value ?? 0;
        analysis.averageWeight.unit = analysis.averageWeight.unit ?? '';

        analysis.weightIncrease.value = analysis.weightIncrease.value ?? 0;
        analysis.weightIncrease.unit = analysis.weightIncrease.unit ?? '';
        analysis.weightIncrease.days = analysis.weightIncrease.days ?? 0;

        analysis.biomass.value = analysis.biomass.value ?? 0;
        analysis.biomass.unit = analysis.biomass.unit ?? '';

        analysis.size.value = analysis.size.value ?? 0;
        analysis.size.unit = analysis.size.unit ?? '';

        analysis.density.value = analysis.density.value ?? 0;
        analysis.density.unit = analysis.density.unit ?? '';

        // Validación y normalización de los arreglos (observations, wholeData, tailData)
        analysis.observations = analysis.observations.map(obs => ({
            key: obs.key ?? '',
            value: obs.value ?? 0,
        }));

        analysis.wholeData = analysis.wholeData.map(whole => ({
            range: whole.range ?? '',
            animals: whole.animals ?? 0,
            biomass: whole.biomass ?? 0,
        }));

        analysis.tailData = analysis.tailData.map(tail => ({
            range: tail.range ?? '',
            animals: tail.animals ?? 0,
            biomass: tail.biomass ?? 0,
        }));

        return analysis;
    });
}
