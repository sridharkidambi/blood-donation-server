import userRoutes from './user/user-routes';
import donorRoutes from './donor/donor-routes';
import smsRoutes from './sms/sms-routes';
import placeRoutes from './places/place-routes';
import drRoutes from './donation-request/dr-routes';

export default [
    ...userRoutes,
    ...donorRoutes,
    ...smsRoutes,
    ...placeRoutes,
    ...drRoutes,
];
