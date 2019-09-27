import express from 'express';
import middlewares from './middlewares';
import errorHandlers from './middlewares/error-handler';
import routes from './routes';
import { applyMiddlewares, applyRoutes } from './utils';
import { slowDown } from './middlewares/common';

const router = express();
router.use(slowDown(500));
applyMiddlewares(middlewares, router);
applyRoutes(routes, router, '/api/v1');
applyMiddlewares(errorHandlers, router);

export default router;
