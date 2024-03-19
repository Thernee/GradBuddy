export default (router) => {
  router.get('/user')
  router.post('/register');
  router.post('/login');
  router.post('/logout');

  return router;
}