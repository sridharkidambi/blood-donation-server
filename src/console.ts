import repl from "repl";
import {getConnection} from './db';
import models from './models';

(async function () {
    const db = await getConnection();

    console.log("Starting node repl");
    const replServer = repl.start({});

    // attach modules to the repl context
    replServer.context.db = db;
})();
