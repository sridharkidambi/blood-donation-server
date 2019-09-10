import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

// https://swagger.io/docs/specification/about/
import swaggerDocument from '../config/swagger.json';

// swagger documentation endpoint
export const handleApiDocs = (router: Router) => {
    router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
