import { AnalysisData } from '../../interfaces/Analisys.Interface';
import { AnalysisRepository } from './repository';
import { validateAndNormalizeAnalysisData } from './validations';

export class AnalysisService {
    private repository: AnalysisRepository;
    
    constructor(repository: AnalysisRepository) {
        this.repository = repository;
    }

    async saveAnalysis(data: AnalysisData[]) {
        const validatedAnalysis = validateAndNormalizeAnalysisData(data);

        for (const analysis of validatedAnalysis) {       
            const headerId = await this.repository.insertHeader(analysis, "Sp_Larvia_Inserta_Cabecera_Analisis");

            if (headerId > 0) {
                // ** Validar si existen datos antes de guardarlos**
                if (analysis.observations?.length > 0) {
                    for (const obs of analysis.observations) {
                        await this.repository.insertDetail(headerId, 'observation', obs.key, '', obs.value, 0);
                    }
                }
                // ** Validar si existen datos antes de guardarlos**
                if (analysis.wholeData?.length > 0) {
                    for (const whole of analysis.wholeData) {
                        await this.repository.insertDetail(headerId, 'wholeData', '', whole.range, whole.animals, whole.biomass);
                    }
                }
                // ** Validar si existen datos antes de guardarlos**
                if (analysis.tailData?.length > 0) {
                    for (const tail of analysis.tailData) {
                        await this.repository.insertDetail(headerId, 'tailData', '', tail.range, tail.animals, tail.biomass);
                    }
                }

                // **💾 Guardar weightGroupData con validaciones**
                if (analysis.weightGroupData?.length > 0) {
                    for (const group of analysis.weightGroupData) {
                        await this.repository.insertDetailWeightGroup(
                            headerId, 
                            group.range,
                            group.animals.count,    
                            group.animals.percent,
                            group.biomass.weight,
                            group.biomass.percent,
                            group.biomass.weight,
                            group.biomass.percent,
                            /* group.biomassKg.weight,
                            group.biomassKg.percent,
                            group.biomassLb.weight,
                            group.biomassLb.percent, */
                            group.averageWeight.value
                        );

                        
                    }
                }
            }
        }
    }
}
