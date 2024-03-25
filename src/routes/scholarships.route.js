import { getScholarships, getScholarship, addScholarship, updateScholarship, deleteScholarship, getScholarshipsBySchool, deleteScholarshipsBySchool } from "../controllers/scholarships.controller.js";

export default (router) => {
  router.get('/scholarships', getScholarships);
  router.get('/scholarships/:scholarship_id', getScholarship);
  router.get('/scholarships/school/:school_id', getScholarshipsBySchool);
  router.post('/scholarships', addScholarship); // add new - admin
  router.patch('/scholarships/:scholarship_id', updateScholarship); // update - admin
  router.delete('/scholarships/:scholarship_id', deleteScholarship); // delete - admin
  router.delete('/scholarships/school/:school_id', deleteScholarshipsBySchool);

  return router;
}
