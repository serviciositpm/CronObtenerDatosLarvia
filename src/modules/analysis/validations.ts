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
        analysis.stockingType = analysis.stockingType ?? '';
        // Asegurar que las propiedades anidadas existen antes de acceder a sus valores
        analysis.averageWeight = analysis.averageWeight ?? { value: 0, unit: '' };
        analysis.weightIncrease = analysis.weightIncrease ?? { value: 0, unit: '', days: 0 };
        analysis.biomass = analysis.biomass ?? { value: 0, unit: '' };
        analysis.size = analysis.size ?? { value: 0, unit: '' };
        analysis.density = analysis.density ?? { value: 0, unit: '' };

        // Validación y normalización de los arreglos (observations, wholeData, tailData)
        analysis.observations = analysis.observations?.map(obs => ({
            key: obs.key ?? '',
            value: obs.value ?? 0,
        })) ?? [];

        analysis.wholeData = analysis.wholeData?.map(whole => ({
            range: whole.range ?? '',
            animals: whole.animals ?? 0,
            biomass: whole.biomass ?? 0,
        })) ?? [];

        analysis.tailData = analysis.tailData?.map(tail => ({
            range: tail.range ?? '',
            animals: tail.animals ?? 0,
            biomass: tail.biomass ?? 0,
        })) ?? [];

        // Validación y normalización de weightGroupData
        analysis.weightGroupData = analysis.weightGroupData?.map(group => ({
            range: group.range ?? '',
            animals: {
                count: group.animals?.count ?? 0,
                percent: group.animals?.percent ?? 0,
            },
            biomass: {
                weight: group.biomass?.weight ?? 0,
                percent: group.biomass?.percent ?? 0,
                unit: group.biomass?.unit ?? '',
            },
            averageWeight: group.averageWeight ?? 0,
        })) ?? [];

        return analysis;
    });
}
