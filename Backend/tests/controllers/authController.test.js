jest.mock('../../models/users.js');
jest.mock('../../utils/sendToken.js');
import users from "../../models/users.js";
import sendToken from "../../utils/sendToken.js";
import { registerUser } from "../../controller/authController.js";
// mock the necessary functions


describe("registerUser controller", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        name: "John Doe",
        email: "john@example.com",
        password: "securepassword",
      },
    };
    // Controller
    // res.status(201).json({ message: "User created" });
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();
  });
  
  it("should create a user and call sendToken with correct args", async () => {
    // Arrange
    const mockUser = {
      _id: "user-id",
      name: "John Doe",
      email: "john@example.com",
    };
    // Fake return
    // const user = await users.create(data);
    users.create.mockResolvedValue(mockUser);
    // Act
    await registerUser(req, res, next);

    expect(users.create).toHaveBeenCalledWith({
      name: "John Doe",
      email: "john@example.com",
      password: "securepassword",
    });
    // Assert
    expect(sendToken).toHaveBeenCalledWith(mockUser, 201, res);
  });
  it("should call next with error if user creation fails", async () => {
  const error = new Error("Database error");
  // Arrange the failure
  users.create.mockRejectedValue(error);

   await registerUser(req, res, next);
  // Confirm it handled the error
  expect(next).toHaveBeenCalledWith(error);
});
});