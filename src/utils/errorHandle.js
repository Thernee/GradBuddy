export default function catchError(asyncTryCatch) {
  return function(req, res, next) {
      asyncTryCatch(req, res, next)
          .catch(error => {
              // If the environment is set to development, log error for debugging.
              if (process.env.NODE_ENV === "development") {
                  console.error("An error occurred:", error);
              }
              next(error);
          });
  };
}
