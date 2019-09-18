import userRoutes from './user';
import donorRoutes from './donor';
import smsRoutes from './sms';

export default [...userRoutes, ...donorRoutes, ...smsRoutes];
