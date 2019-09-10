import { createConnection } from 'typeorm';
import { entities } from './entities';
import config from './config';

export const getConnection = () => {
    return createConnection({
        type: 'postgres',
        host: config.dbHost,
        port: config.dbPort,
        username: config.dbUser,
        password: config.dbPassword,
        database: config.dbName,
        entities: entities,
        synchronize: true,
        logging: config.isDevelopment
    });
};
