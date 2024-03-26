import { registerUser, loginUser } from "../controllers/userAuth.controller.js";
import { validateRegisterUser, validateLoginUser } from "../middleware/validations/userAuthValidation.js";

export default (router) => {
  router.post('/register', validateRegisterUser, registerUser);
  router.post('/login', validateLoginUser, loginUser);
  router.post('/logout');

  return router;
}
