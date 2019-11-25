import axios from 'axios';
import config from "../config";
import Place from "./palce-model";
import {plainToClass} from "class-transformer";


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

export const placeDetail = async (placeId: string): Promise<Place> => {
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

export const findOrCreatePlace = async (gmapsId: string): Promise<Place> => {
    const placeFromDb = await Place.findOne({gmapsId});
    if (placeFromDb) return placeFromDb;

    const place = await placeDetail(gmapsId);
    await place.save();
    return place;
};

const placeFromPlaceResult = (json: any): Place => {
    const data = {
        gmapsId: json.place_id,
        name: json.name,
        phoneNumber: json.international_phone_number,
        address: json.formatted_address,
        location: {
            latitude: json.geometry.location.lat,
            longitude: json.geometry.location.lng
        }
    };
    return plainToClass(Place, data);
};
