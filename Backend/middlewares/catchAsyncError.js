// export default (controllerFunction) => (req,res,next) => {
//     Promise.resolve(controllerFunction(req, res, next)).catch(next)
// }

export default (controllerFunction) => (req, res, next) => {
//   console.log("In catchAsyncError wrapper");
  return Promise.resolve(controllerFunction(req, res, next)).catch((err) => {
    // console.log("Caught error:", err.message);
    next(err);
  });
};