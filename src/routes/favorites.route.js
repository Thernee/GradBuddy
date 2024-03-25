import { getFavorites, addFavorite, deleteFavorite } from "../controllers/favorites.controller.js";

export default (router) => {
  router.get('/favorites/:user_id', getFavorites);
  router.post('/favorites/:user_id', addFavorite);
  router.delete('/favorites/:user_id', deleteFavorite);

  return router;
}
