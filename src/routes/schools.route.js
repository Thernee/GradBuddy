export default (router) => {
  router.get('/schools');
  router.get('/schools/:id');
  router.get('/schools/search');
  router.post('/schools'); // add new: admin
  router.patch('schools/:id'); // update: admin
  router.delete('schools/:id'); // admin

  return router;
}