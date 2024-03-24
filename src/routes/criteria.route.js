import { getCriteria, addCriteria, updateCriteria, deleteCriteria } from "../controllers/criteria.controller.js";

export default (router) => {
  router.get('/criteria/:school_id', getCriteria);
  router.post('/criteria/:school_id', addCriteria); // add new - admin
  router.patch('/criteria/:school_id', updateCriteria); // update - admin
  router.delete('/criteria/:school_id', deleteCriteria); // delete - admin

  return router;
}
