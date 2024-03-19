import { Router } from 'express';
import criteriaRoute from './criteria.route';
import favoritesRoute from './favorites.route';
import scholarshipsRoute from './scholarships.route';
import schoolsRoute from './schools.route';
import userAuthRoute from './userAuth.route';
import userRoute from './user.route';

const router = Router();

criteriaRoute(router);
favoritesRoute(router);
scholarshipsRoute(router);
schoolsRoute(router);
userAuthRoute(router);
userRoute(router);

export default router;
