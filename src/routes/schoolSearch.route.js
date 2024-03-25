import { searchSchools } from "../controllers/schoolSearch.controller.js";

export default (router) => {
  router.get('/search', searchSchools);

  return router;
}
