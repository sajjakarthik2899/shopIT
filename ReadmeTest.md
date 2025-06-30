test("description of what should happen", () => {
  // 1. Setup (arrange data)
  // 2. Execution (run function)
  // 3. Assertion (check result)
});


Steps involved here is:
1. npm install --save-dev jest

2. Add to package.json:
    "scripts": {
    "test": "jest"
    }

3. EXAMPLE: 
    // math.js
    function multiply(a, b) {
    return a * b;
    }

    module.exports = multiply;
4. ✅ Step 3: Create Test in math.test.js
    // math.test.js
    const multiply = require('./math');

    test("multiplies two positive numbers", () => {
    expect(multiply(3, 4)).toBe(12);
    });

    test("multiplies with zero", () => {
    expect(multiply(0, 5)).toBe(0);
    });
5. npm test

📖 Summary of Terminologies
Term	What it means	Example
mock	A fake version of a function used in tests	jest.fn() or jest.mock(): this keeps 
    a) Keeps track of how many times it was called
    b) Stores all the arguments it was called with

describe	A group of related test cases	describe("registerUser", ...)

test or it	A single test case	test("should do something", ...)

jest.mock ---- These lines automatically replace the real modules (users.js and sendToken.js) with mock versions that Jest controls.
    jest.mock("../models/users.js");
    Then any time in your test you call:
    users.create()
You're calling a mock function, which you can control using:
    users.create.mockResolvedValue({ name: "John" });
    users.create is a mocked async function. which is similar to const result = await users.create(); it should resolve 
    (return a Promise) with { name: "John" }."

    expect(users.create).toHaveBeenCalledWith(...);
    expect(users.create).toHaveBeenCalledWith({
        name: "John Doe",
        email: "john@example.com",
        password: "securepassword"
    });. Expect(...).toHaveBeenCalledWith(...) is an assertion that checks: “Did users.create get called with the exact object we passed to it?”.

    jest.mock	Used to mock entire modules or files	jest.mock("module-path")
    res.status().json()	How Express sends response, mocked in tests	jest.fn().mockReturnThis()

    beforeEach(...) – runs setup before each test
    afterEach(...) – cleans up after each test  

    Syntax to follow:

    describe("registerUser controller", () => {
        beforeEach(() => {...});
        afterEach(() => {...});
        
        it("should ...", async () => {...});
        it("should ...", async () => {...});
    });
    & in package.json, Add this
     "scripts": {
        "test": "jest"
  },
    ✅ Real-World Example
    // Controller
    res.status(201).json({ message: "User created" });

    // Test
    const res = {
        status: jest.fn().mockReturnThis(), // so we can chain
        json: jest.fn(),
    };
