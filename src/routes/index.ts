import userRoutes from './user-routes';
import donorRoutes from './donor-routes';
import smsRoutes from './sms-routes';

export default [...userRoutes, ...donorRoutes, ...smsRoutes];
