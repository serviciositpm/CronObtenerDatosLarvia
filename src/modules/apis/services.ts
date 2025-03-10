import axios from 'axios';
import { API_KEY } from '../../environments/env';

export class ApiService {
    private apiKey = API_KEY;

    async fetchData(campusId: string): Promise<any> {
        const url = `https://api.dev.larvia.ai/analysis/analysis/biometrics/data/api-key?phaseType=ADULT&biometricType=COMMERCIAL_SIZES&date=${new Date().toISOString().split('T')[0]}&campusId=${campusId}`;
        const response = await axios.get(url, {
            headers: { 'Authorization': `Bearer ${this.apiKey}` }
        });
        return response.data;
    }
}