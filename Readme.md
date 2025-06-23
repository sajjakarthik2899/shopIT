1. 🧨 uncaughtException = Synchronous Error Not Caught
It happens when you make a mistake (like throw new Error) outside of async code, and forget to wrap it in a safety net.
something that throws an error out of synchronous code. 

2. 🌊 unhandledRejection = Promise Error Not Handled
It happens when a Promise fails and you forget to catch the error. 

The order of the unCaughtException & unHandledRejection should be like
unCaughtException should be immediately after the imports.
unHandledRejection should be after the app.listen since most of it occurs after the complete connection to DB.

.next() i.e return next(new ErrorHandler("Product not found",404)) in productsController -> app.js errorMiddleware which is errors.js where error showing is handled


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
json
Copy
Edit
{
  "name": "CastError",
  "message": "Cast to ObjectId failed for value '12345' at path '_id'"
}

4.ValidationError
✅ What is it?
A ValidationError happens when you try to save or update a document that doesn't follow the rules defined in your Mongoose schema.