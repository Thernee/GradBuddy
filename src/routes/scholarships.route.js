export default (router) => {
  router.get('/scholarships');
  router.get('/scholarships/:scholarship_id');
  router.post('/scholarships'); // add new - admin
  router.patch('scholarships/:scholarship_id'); // update - admin
  router.delete('scholarships/:scholarship_id'); // delete - admin

  return router;
}
