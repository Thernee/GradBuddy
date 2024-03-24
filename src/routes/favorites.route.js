import { getFavorites, addFavorite, deleteFavorite } from "../controllers/favorites.controller.js";

export default (router) => {
  router.get('/favorites', getFavorites);
  router.post('/favorites/:school_id', addFavorite);
  router.delete('/favorites/:school_id', deleteFavorite);

  return router;
}
