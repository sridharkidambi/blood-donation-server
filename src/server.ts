import router from './router';
import 'reflect-metadata'; // important to import this at the very begining
import { getConnection } from './db';
import config from './config';

// assure that all config properties are set
if (!config.isConfigured) {
    console.error('Please set the config vars');
    process.exit(1);
}

// terminate instance on exception
process.on('uncaughtException', e => {
    console.log(e);
    process.exit(1);
});
process.on('unhandledRejection', e => {
    console.log(e);
    process.exit(1);
});

(async () => {
    // create db tables for defined entities
    await getConnection();

    // start the server
    router.listen(config.port, () =>
        console.log(`Server is running at http://localhost:${config.port}...`)
    );
})();
