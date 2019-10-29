import axios from 'axios';
import config from "../config";

export const searchHospitals = async (input: string, location: string) => {
    const url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';

    const params = {
        key: config.googleMapsKey,
        input,
        location,
        components: 'country:in',
        radius: 20000,
        types: 'establishment',
    };

    try {
        const placesResponse = await axios.get(url, {params});
        const result = (placesResponse.data).predictions.map((prediction: any) => ({
            place_id: prediction.place_id,
            description: prediction.description,
            terms: prediction.terms
        }));
        return result;
    } catch (e) {
        console.error(e);
        return [];
    }
};