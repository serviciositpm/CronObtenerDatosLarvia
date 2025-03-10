import axios from 'axios';
import { API_KEY, BASE_URL_API } from '../../environments/env';
export class ApiService {
    private apiKey = API_KEY;

    async fetchData(campusId: string, phaseType: string,biometricType: string,date: string ): Promise<any> {
        //new Date().toISOString().split('T')[0]
        const url = `${BASE_URL_API}?phaseType=${phaseType}&biometricType=${biometricType}&date=${date}&campusId=${campusId}`;
        try {
            const response = await axios.get(url, {
                headers: { 'Authorization': API_KEY }
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching data for campusId ${campusId} and phaseType ${phaseType}:`, error);
            return null;
        }
    }
}