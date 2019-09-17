import { Router, RequestHandler } from 'express';
import bcrypt from 'bcrypt';

export const applyMiddlewares = (
    middlewares: MiddlewareWrapper[],
    router: Router
) => middlewares.forEach(m => m(router));

type MiddlewareWrapper = (router: Router) => void;

export const applyRoutes = (
    routes: Route[],
    router: Router,
    namespace: string = '' // a prefix for all the routes defined
) => {
    routes.forEach(route => {
        const { method, handler } = route;
        const path = namespace + route.path;
        (router as any)[method](path, handler);
    });
};

type Route = {
    path: string;
    method: string;
    handler: RequestHandler | RequestHandler[];
};

export const encrypt = (value: string) => bcrypt.hashSync(value, 10);

export const anyFalsy = (...values: any[]) => {
    for (let v of values) {
        if (!v) return true;
    }
    return false;
};
