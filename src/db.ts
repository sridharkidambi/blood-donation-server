import {createConnection} from 'typeorm';
import models from './models';
import config from './config';
import {SnakeNamingStrategy} from './common/snakecase-naming-strategy';

export const getConnection = () => {
    return createConnection({
        type: 'postgres',
        host: config.dbHost,
        port: config.dbPort,
        username: config.dbUser,
        password: config.dbPassword,
        database: config.dbName,
        entities: models,
        migrations: ["migration/*.ts"],
        cli: {migrationsDir: "migration"},
        synchronize: true,
        namingStrategy: new SnakeNamingStrategy(),
        logging: config.isDevelopment
    });
};
