1. 🧨 uncaughtException = Synchronous Error Not Caught
Any synchronous error in your Node.js backend that is not wrapped in a try...catch block will be caught by this. 
console.log(user.name); // 🧨 'user' is not defined

2. 🌊 unhandledRejection = Promise Error Not Handled
❌ Throwing in an async function without try/catch
async function test() {
  throw new Error("Async error");
}
test(); // ❌ No try/catch → triggers unhandledRejection

The order of the unCaughtException & unHandledRejection should be like
unCaughtException should be immediately after the imports.
unHandledRejection should be after the app.listen since most of it occurs after the complete connection to DB.

.next() i.e return next(new ErrorHandler("Product not found",404)) in productsController -> app.js errorMiddleware which is errors.js where error showing is handled. when in an controller function if it goes to catch block in which next(error) is there then Skips remaining middlewares and jumps to the error handler middleware (middleware that has 4 arguments: err, req, res, next) like error.js file.


<!-- The below errors usually occur when interacting with the Database -->
3. CastError
✅ What is it?
A CastError occurs when Mongoose fails to convert (or "cast") a value to the type defined in your schema.
📌 Common Example:
const product = await Product.findById("12345");
If "12345" is not a valid MongoDB ObjectId, Mongoose will throw a CastError.
🧠 Think of it like:
"Hey, I expected an ObjectId here, but I got something I can't convert into that!"
🔴 Example Output:
{
  "name": "CastError",
  "message": "Cast to ObjectId failed for value '12345' at path '_id'"
}

4.ValidationError
✅ What is it?
A ValidationError happens when you try to save or update a document that doesn't follow the rules defined in your Mongoose schema.