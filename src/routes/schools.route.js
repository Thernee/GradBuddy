export default (router) => {
  router.get('/schools'); // get all schools
  router.get('/schools/:id'); // get specific school
  router.get('/schools/search');
  router.post('/schools'); // add new: admin
  router.patch('schools/:id'); // update: admin
  router.delete('schools/:id'); // admin

  return router;
}
