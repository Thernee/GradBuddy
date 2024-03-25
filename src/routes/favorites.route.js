import { getFavorites, addFavorite, deleteFavorite } from "../controllers/favorites.controller.js";
import { userAuth } from "../middleware/authorisation/userAuth.js";

export default (router) => {
  router.get('/favorites', userAuth, getFavorites);
  router.post('/favorites', userAuth, addFavorite);
  router.delete('/favorites', userAuth, deleteFavorite);

  return router;
}
