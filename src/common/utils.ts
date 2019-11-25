import {RequestHandler, Router} from 'express';

export const applyMiddlewares = (
    middlewares: MiddlewareWrapper[],
    router: Router
) => middlewares.forEach(m => m(router));

type MiddlewareWrapper = (router: Router) => void;

export const applyRoutes = (
    routes: Route[],
    router: Router,
    authMiddleware: RequestHandler,
    namespace: string = '' // a prefix for all the routes defined
) => {
    routes.forEach(route => {
        const { method, handler, noAuth } = route;
        const path = namespace + route.path;
        if (noAuth) {
            (router as any)[method](path, handler);
        } else {
            (router as any)[method](path, authMiddleware, handler);
        }
    });
};

type Route = {
    path: string;
    method: string;
    noAuth?: boolean;
    handler: RequestHandler | RequestHandler[];
};

export const anyFalsy = (...values: any[]) => {
    for (let v of values) {
        if (!v) return true;
    }
    return false;
};

export const getValues = (obj: any) => Object.keys(obj).map(o => obj[o]);
