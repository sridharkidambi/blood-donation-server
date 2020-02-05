import userRoutes from './routes/user-routes';
import donorRoutes from './routes/donor-routes';
import smsRoutes from './sms/sms-routes';
import placeRoutes from './routes/place-routes';
import drRoutes from './routes/dr-routes';

export default [
    ...userRoutes,
    ...donorRoutes,
    ...smsRoutes,
    ...placeRoutes,
    ...drRoutes,
];
