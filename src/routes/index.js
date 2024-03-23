import { Router } from 'express';
import criteriaRoute from './criteria.route.js';
import favoritesRoute from './favorites.route.js';
import scholarshipsRoute from './scholarships.route.js';
import schoolsRoute from './schools.route.js';
import userAuthRoute from './userAuth.route.js';
import userRoute from './user.route.js';

const router = Router();

criteriaRoute(router);
favoritesRoute(router);
scholarshipsRoute(router);
schoolsRoute(router);
userAuthRoute(router);
userRoute(router);

export default router;
