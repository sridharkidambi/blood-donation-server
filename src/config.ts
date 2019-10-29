import { anyFalsy } from './common/utils';

// load the config from .env files
require('custom-env').env(process.env.NODE_ENV || 'development');

// a handy class to hold all config
export class Config {
    env: string;
    jwtSecret: string;
    port: number;
    dbHost: string;
    dbName: string;
    dbUser: string;
    dbPassword: string;
    dbPort: number;
    msg91AuthKey: string;
    googleMapsKey: string;

    constructor() {
        this.env = process.env.NODE_ENV!;
        this.jwtSecret = process.env.JWT_SECRET!;
        this.port = +process.env.PORT!;
        this.dbHost = process.env.DB_HOST!;
        this.dbName = process.env.DB_NAME!;
        this.dbUser = process.env.DB_USER!;
        this.dbPassword = process.env.DB_PASSWORD!;
        this.dbPort = +process.env.DB_PORT!;
        this.msg91AuthKey = process.env.MSG91_AUTH_KEY!;
        this.googleMapsKey = process.env.GOOGLE_MAPS_KEY!;
    }

    get isDevelopment() {
        return this.env === 'development';
    }

    get isProduction() {
        return this.env === 'production';
    }

    get isConfigured() {
        return !anyFalsy(
            process.env.JWT_SECRET,
            process.env.DB_NAME,
            process.env.DB_USER,
            process.env.DB_PASSWORD,
            process.env.DB_HOST,
            process.env.DB_PORT
        );
    }
}

export default new Config();
