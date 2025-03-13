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
            const headerId = await this.repository.insertHeader(analysis,"Sp_Larvia_Inserta_Cabecera_Analisis");
            if(headerId > 0){
                for (const obs of analysis.observations) {
                    await this.repository.insertDetail(headerId, 'observation', obs.key, '', obs.value, 0);
                }
                for (const whole of analysis.wholeData) {
                    await this.repository.insertDetail(headerId, 'wholeData', '', whole.range, whole.animals, whole.biomass);
                }
                for (const tail of analysis.tailData) {
                    await this.repository.insertDetail(headerId, 'tailData', '', tail.range, tail.animals, tail.biomass);
                }
            }
        }
    }
}


