export default (router) => {
  router.get('/users'); // get user details
  router.put('/users'); // update user - diffrentiate with middleware
  router.put('/users/updatePassword');
  router.delete('/users');

  return router;
}
