import userRoutes from './user/user-routes';
import donorRoutes from './donor/donor-routes';
import smsRoutes from './sms/sms-routes';
import hospitalRoutes from './hopital/hospital-routes'

export default [
    ...userRoutes,
    ...donorRoutes,
    ...smsRoutes,
    ...hospitalRoutes
];
