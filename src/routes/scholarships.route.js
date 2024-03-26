import { getScholarships, getScholarship, addScholarship, updateScholarship, deleteScholarship, getScholarshipsBySchool, deleteScholarshipsBySchool } from "../controllers/scholarships.controller.js";
import { validateAddScholarship, validateUpdateScholarship } from "../middleware/validations/scholarshipValidation.js";

export default (router) => {
  router.get('/scholarships', getScholarships);
  router.get('/scholarships/:scholarship_id', getScholarship);
  router.get('/scholarships/school/:school_id', getScholarshipsBySchool);
  router.post('/scholarships', validateAddScholarship, addScholarship); // add new - admin
  router.patch('/scholarships/:scholarship_id', validateUpdateScholarship, updateScholarship); // update - admin
  router.delete('/scholarships/:scholarship_id', deleteScholarship); // delete - admin
  router.delete('/scholarships/school/:school_id', deleteScholarshipsBySchool);

  return router;
}
