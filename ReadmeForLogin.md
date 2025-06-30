Everything starts in app.js:
Include "app.use(express.static(path.join(__dirname, "public")));" to tell Express to serve static files. It is discussed later for reset password.

In the Auth route:
app.use("/api/v1", authRoutes); ------>
It has 5 routes:
    router.route("/register").post(registerUser);
    router.route("/login").post(loginUser);
    router.route("/logout").get(logoutUser);
    router.post("/password/forgot", forgotPassword);
    router.put("/password/reset/:token", resetPassword);
Lets go one by one but before that we need to define the users Schema:
Define Schema with basic details such as name, email, password, avatar, role.
const userSchema = mongoose.Schema(
  
);

Now if registerUser is hit then taking user details and create. Then send the JWT token to front end. Process for sending is to     
a) install cookie-parser.
b) app.use(cookieParser()); and import cookieparser in app.js
c) Then send the response back.

Now if LoginUser is hit 
1. catchAsyncError this function works like alternative to the try catch block. when next is passed from catchAsyncError if any error occurs then it goes down to next(new ErrorHandler("Invalid password", 401))
2. send Token

Now if we Logout hit
a) we empty the token and 
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

Now if we hit the route "/password/forgot" then
    a) Find the record with email, if not found then return Error
    b) Then a new token and new expiry is set and hashed value of it is stored in key resetExpireyToken
        const resetToken = user.getResetPasswordToken();
        console.log("resetToken", resetToken)
        await user.save({ validateBeforeSave: false });
    c) send token to mail using sendEmail utility function 
    d) now a link will be received in the mail with the token generated attached to URL, to reset a static page to enter new password is to be developed

Now to develop a static page you must include "app.use(express.static(path.join(__dirname, "public")));" to tell Express to serve static files.

    a) Now fetch the token from URL and then hash it again in resetPassword controller and compare it to the DB and do checks. 

