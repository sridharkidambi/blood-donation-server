import userRoutes from './user-routes';
import donorRoutes from './donor-routes';
import smsRoutes from './sms-routes';
import placeRoutes from './place-routes';
import drRoutes from './dr-routes';

export default [
    ...userRoutes,
    ...donorRoutes,
    ...smsRoutes,
    ...placeRoutes,
    ...drRoutes,
];
