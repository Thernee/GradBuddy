import { getUser, updateUser, deleteUser, updateUserPassword } from "../controllers/user.controller.js";

export default (router) => {
  router.get('/users', getUser); // get user details
  router.put('/users', updateUser); // update user - diffrentiate with middleware
  router.put('/users/updatePassword', updateUserPassword);
  router.delete('/users', deleteUser);

  return router;
}
