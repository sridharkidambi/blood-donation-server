import userRoutes from './user-routes';
import donorRoutes from './donor-routes';
import smsRoutes from './sms-routes';
import placeRoutes from './place-routes';
import drRoutes from './donation-request-routes';

export default [
    ...userRoutes,
    ...donorRoutes,
    ...smsRoutes,
    ...placeRoutes,
    ...drRoutes,
];
