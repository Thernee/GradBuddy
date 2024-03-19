export default (router) => {
  router.get('/criteria/:school_id');
  router.post('/criteria/:school_id'); // add new - admin
  router.patch('criteria/:school_id'); // update - admin
  router.delete('criteria/:school_id'); // delete - admin

  return router;
}
