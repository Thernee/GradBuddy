import { getUser, updateUser, deleteUser, updateUserPassword, getAllUsers } from "../controllers/user.controller.js";
import { userAuth } from "../middleware/authorisation/userAuth.js";
import { validateUpdateUser, validateUpdatePassword } from "../middleware/validations/userValidation.js";

export default (router) => {
  router.get('/users', getAllUsers); // get all users - admin
  router.get('/user', userAuth, getUser); // get user details
  router.patch('/users', userAuth, validateUpdateUser, updateUser); // update user profile
  router.put('/users/updatePassword', userAuth, validateUpdatePassword, updateUserPassword); // update user password
  router.delete('/users/:user_id', deleteUser); // use token later

  return router;
}
