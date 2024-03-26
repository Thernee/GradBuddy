import { getCriteria, addCriteria, updateCriteria, deleteCriteria } from "../controllers/criteria.controller.js";
import { validateCreateCriteria, validateUpdateCriteria } from "../middleware/validations/criteriaValidation.js";

export default (router) => {
  router.get('/criteria/:school_id', getCriteria);
  router.post('/criteria/:school_id', validateCreateCriteria, addCriteria); // add new - admin
  router.patch('/criteria/:school_id', validateUpdateCriteria, updateCriteria); // update - admin
  router.delete('/criteria/:school_id', deleteCriteria); // delete - admin

  return router;
}
