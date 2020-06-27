import repl from "repl";
import {getConnection} from './db';
import {models} from './models';
import faker from 'faker';

(async function () {
    const db = await getConnection();

    console.log("Starting node repl");
    const replServer = repl.start({});

    // attach modules to the repl context
    replServer.context.db = db;

    replServer.context.faker = faker;
    Object.entries(models).forEach(([key, val]) => {
        replServer.context[key] = val;
    });
})();
