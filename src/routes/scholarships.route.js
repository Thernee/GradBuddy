export default (router) => {
  router.get('/scholarships');
  router.get('/scholarships/:id');
  router.post('/scholarships'); // add new: admin
  router.patch('scholarships/:id'); // update: admin
  router.delete('scholarships/:id'); // admin

  return router;
}
