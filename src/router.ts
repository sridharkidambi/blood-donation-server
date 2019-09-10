import express from 'express';
import middlewares from './middlewares';
import errorHandlers from './middlewares/error-handler';
import routes from './routes';
import { applyMiddlewares, applyRoutes } from './utils';

const router = express();
applyMiddlewares(middlewares, router);
applyRoutes(routes, router, '/api/v1');
applyMiddlewares(errorHandlers, router);

export default router;
