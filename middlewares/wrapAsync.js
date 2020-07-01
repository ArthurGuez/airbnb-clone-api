const wrapAsync = (fn) => {
  return function (request, response, next) {
    // Make sure to `.catch()` any errors and pass them along to the `next()`
    // middleware in the chain, in this case the error handler.
    fn(request, response, next).catch(next);
  };
};

module.exports = wrapAsync;
