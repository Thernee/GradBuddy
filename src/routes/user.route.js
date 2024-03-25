import { getUser, updateUser, deleteUser, updateUserPassword, getAllUsers } from "../controllers/user.controller.js";

export default (router) => {
  router.get('/users', getAllUsers); // get all users - admin
  router.get('/users/:user_id', getUser); // get user details - remove param later, use token
  router.patch('/users/:user_id', updateUser); // update user - use token later
  router.put('/users/updatePassword/:user_id', updateUserPassword); // update user password - use token later
  router.delete('/users/:user_id', deleteUser); // use token later

  return router;
}
