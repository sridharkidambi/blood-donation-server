import axios from 'axios';
import config from "../config";
import Place from "../models/place";
import {plainToClass} from "class-transformer";
import {AddressParam} from "../models/address";
import {safeJoin} from "../common/utils";


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
        fields: 'name,place_id,international_phone_number,geometry,address_components',
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
    const address = addressFromPlaceResult(json.address_components);
    address.coordinate = {
        latitude: json.geometry.location.lat,
        longitude: json.geometry.location.lng
    };

    const data = {
        gmapsId: json.place_id,
        name: json.name,
        phoneNumber: json.international_phone_number,
        address,
    };
    return plainToClass(Place, data);
};

const addressFromPlaceResult = (components: {
    long_name: string
    short_name: string
    types: string[]
}[]): AddressParam => {
    let street_number = ''; // door number
    let route = ''; // street name

    let sublocality_level_1 = ''; // area
    let sublocality_level_2 = ''; // area

    let administrative_area_level_2 = ''; // city
    let locality = ''; // city

    let administrative_area_level_1 = ''; // state

    let country = ''; // country

    let postal_code = ''; // pincode

    components.forEach(component => {
        const types = component.types;
        if (types.includes('street_number')) {
            street_number = component.long_name;
        } else if (types.includes('route')) {
            route = component.long_name;
        } else if (types.includes('sublocality_level_1')) {
            sublocality_level_1 = component.long_name;
        } else if (types.includes('sublocality_level_2')) {
            sublocality_level_2 = component.long_name;
        } else if (types.includes('administrative_area_level_2')) {
            administrative_area_level_2 = component.long_name;
        } else if (types.includes('locality')) {
            locality = component.long_name;
        } else if (types.includes('postal_code')) {
            postal_code = component.long_name;
        } else if (types.includes('administrative_area_level_1')) {
            administrative_area_level_1 = component.long_name;
        } else if (types.includes('country')) {
            country = component.long_name;
        }
    });

    return {
        street: safeJoin(street_number, route),
        area: safeJoin(sublocality_level_2, sublocality_level_1),
        city: administrative_area_level_2 || locality,
        state: administrative_area_level_1,
        country,
        pincode: parseInt(postal_code),
    };
};
