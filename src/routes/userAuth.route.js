import { registerUser, loginUser } from "../controllers/userAuth.controller.js";

export default (router) => {
  router.post('/register', registerUser);
  router.post('/login', loginUser);
  router.post('/logout');

  return router;
}
