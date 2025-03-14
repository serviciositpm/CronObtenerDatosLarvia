import axios from 'axios';
import { API_KEY, BASE_URL_API } from '../../environments/env';

export class ApiService {
    private apiKey = API_KEY;

    async fetchData(campusId: string, phaseType: string, biometricType: string, date: string): Promise<any> {
        const url = `${BASE_URL_API}?phaseType=${phaseType}&biometricType=${biometricType}&date=${date}&campusId=${campusId}`;
        try {
            const response = await axios.get(url, {
                headers: { 'Authorization': API_KEY }
            });

            // Validación de la respuesta
            if (!response || !response.data) {
                console.log(`⚠️  Advertencia: La API no devolvió datos para campusId ${campusId} y phaseType ${phaseType}`);
                return [];
            }

            // Si `response.data` es un array, verificamos que tenga elementos
            if (Array.isArray(response.data) && response.data.length === 0) {
                console.log(`⚠️ Advertencia: La API devolvió un array vacío para campusId ${campusId} y phaseType ${phaseType}`);
                return [];
            }

            return response.data;
        } catch (error) {
            console.log(`❌ Error al obtener datos para campusId ${campusId} y phaseType ${phaseType}:`, error);
            return [];
        }
    }
}
