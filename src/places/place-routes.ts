import * as controller from './place-controller';

export default [
    {
        path: '/search_places',
        method: 'get',
        handler: [controller.searchPlace]
    },
    {
        path: '/place_detail',
        method: 'get',
        handler: [controller.placeDetail]
    }
];
