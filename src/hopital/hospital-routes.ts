import * as controller from './hospital-controller';

export default [
    {
        path: '/search_hospitals',
        method: 'get',
        handler: [controller.searchHospital]
    }
];
