import { getSchools, getSchool, addSchool, updateSchool, deleteSchool } from "../controllers/schools.controller.js";

export default (router) => {
  router.get('/schools', getSchools); // get all schools
  router.post('/schools', addSchool); // add new: admin
  router.get('/schools/:school_id', getSchool); // get specific school
  router.patch('/schools/:school_id', updateSchool); // update: admin
  router.delete('/schools/:school_id', deleteSchool); // admin

  return router;
}
