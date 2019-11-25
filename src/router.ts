import express from 'express';
import middlewares from './middlewares';
import errorHandlers from './middlewares/error-handler';
import routes from './routes';
import {applyMiddlewares, applyRoutes} from './common/utils';
import {verify} from './middlewares/auth-middleware';
import {slowDown} from './middlewares/common';

const router = express();
router.use(slowDown(500)); // slow down the request for testing
applyMiddlewares(middlewares, router);
applyRoutes(routes, router, verify, '/api/v1');
applyMiddlewares(errorHandlers, router);

export default router;
