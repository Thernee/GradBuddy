export default (router) => {
  router.get('/favorites');
  router.post('/favorites/:school_id');
  router.delete('/favorites/:school_id');

  return router;
}