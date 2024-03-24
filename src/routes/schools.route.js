import { getSchools, getSchool, addSchool, updateSchool, deleteSchool } from "../controllers/schools.controller.js";
import { searchSchools } from "../controllers/schoolSearch.controller.js";

export default (router) => {
  router.get('/schools', getSchools); // get all schools
  router.get('/schools/:id', getSchool); // get specific school
  router.get('/schools/search', searchSchools);
  router.post('/schools', addSchool); // add new: admin
  router.patch('/schools/:id', updateSchool); // update: admin
  router.delete('/schools/:id', deleteSchool); // admin

  return router;
}
