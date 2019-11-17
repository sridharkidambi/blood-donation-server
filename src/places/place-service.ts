import axios from 'axios';
import config from "../config";


export const searchPlace = async (input: string, location: string) => {
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
            mainText: prediction.structured_formatting.main_text,
            secondaryText: prediction.structured_formatting.secondary_text,
            placeId: prediction.place_id,
            description: prediction.description,
        }));
        return result;
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const placeDetail = async (placeId: string): Promise<object> => {
    const url = 'https://maps.googleapis.com/maps/api/place/details/json';

    const params = {
        key: config.googleMapsKey,
        place_id: placeId,
        fields: 'name,place_id,international_phone_number,formatted_address,geometry',
    };

    const response = await axios.get(url, {params});
    const {data} = response;
    if (data.status !== "OK") {
        throw new Error();
    }
    return placeFromPlaceResult(data.result);
};

const placeFromPlaceResult = (json: any): object => {
    return {
        gmapsId: json.palce_id,
        name: json.name,
        phoneNumber: json.international_phone_number,
        address: json.formatted_address,
        location: {
            latitude: json.geometry.location.lat,
            longitude: json.geometry.location.lng
        }
    };
};