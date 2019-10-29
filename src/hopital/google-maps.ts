import config from "../config";

export default require('@google/maps').createClient({
    key: config.googleMapsKey,
    Promise: Promise
});