import { getUser, updateUser, deleteUser, updatePassword } from "../controllers/user.controller.js";

export default (router) => {
  router.get('/users', getUser); // get user details
  router.put('/users', updateUser); // update user - diffrentiate with middleware
  router.put('/users/updatePassword', updatePassword);
  router.delete('/users', deleteUser);

  return router;
}
