/**
 * @file authentication.test.js
 * @description This file contains unit tests for the authentication API of the PrisonSphere system.
 * It uses Jest and Supertest to verify login, logout, and protected route access.
 *
 * @dependencies
 * - supertest: Makes HTTP requests to the Express server for testing.
 * - bcryptjs: Hashes passwords to simulate real authentication scenarios.
 * - Jest: Runs the test suite.
 * - MongoDB (via setupTestDB.js): Uses an in-memory database for isolated tests.
 *
 * @test Cases:
 * - ✅ Successful login returns a JWT token.
 * - ❌ Login fails with incorrect credentials.
 * - ❌ Login fails for non-existent users.
 * - ✅ Successful logout returns a confirmation message.
 * - ❌ Access to protected routes is blocked without authentication.
 * - ✅ Valid JWT tokens allow access to protected routes.
 *
 * @setup
 * - Before all tests, a test database connection is established.
 * - Before each test, a new test user is created.
 * - After each test, the database is cleared.
 * - After all tests, the database connection is closed.
 *
 * @author Faruq A. Atanda
 * @date 2025-02-10
 */

const request = require("supertest");
const app = require("../../server");
const { connect, closeDatabase, clearDatabase } = require("./setupTestDb");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

beforeAll(async () => {
  await connect();
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

describe("Authentication API Tests", () => {
  let testUser;

  beforeEach(async () => {
    await clearDatabase(); // ✅ Clear database BEFORE inserting the user

    testUser = new User({
      username: "testadmin",
      password: "securepassword", // ✅ Save as plain text (model will hash automatically)
      role: "Admin",
    });

    await testUser.save(); // ✅ Save correctly
    console.log("✅ DEBUG: Created Test User", testUser);
  });

  test("✅ Should log in a valid user and return a token", async () => {
    // Log all users in the database
    const users = await User.find();
    console.log("DEBUG: Users in DB before login", users);

    const res = await request(app).post("/prisonsphere/auth/login").send({
      username: testUser.username,
      password: "securepassword",
    });

    console.log("DEBUG: Full Login Response", res.body);
    console.log("DEBUG: Status Code", res.statusCode);
    console.log("DEBUG: Headers", res.headers);

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.role).toBe("Admin");

    global.authToken = res.body.token;
    global.authCookie = res.headers["set-cookie"];
  });

  test("❌ Should reject login with wrong password", async () => {
    const res = await request(app).post("/prisonsphere/auth/login").send({
      username: testUser.username,
      password: "wrongpassword",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Invalid credentials");
  });

  test("❌ Should reject login for non-existent user", async () => {
    const res = await request(app).post("/prisonsphere/auth/login").send({
      username: "nonexistent",
      password: "securepassword",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Invalid credentials");
  });

  test("✅ Should log out a user", async () => {
    const res = await request(app).get("/prisonsphere/auth/logout");

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Logged out successfully");
  });

  test("❌ Should block access to protected routes without authentication", async () => {
    const res = await request(app).get("/prisonsphere/protected");

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Unauthorized");
  });

  test("✅ Should allow access to protected routes with a valid token", async () => {
    if (!global.authCookie) {
      throw new Error("🔥 Auth cookie is undefined! Fix login test.");
    }

    const protectedRes = await request(app)
      .get("/prisonsphere/protected")
      .set("Cookie", global.authCookie); // ✅ Use stored cookie

    console.log("DEBUG: Protected Route Response", protectedRes.body); // ✅ Log response

    expect(protectedRes.statusCode).toBe(200);
    expect(protectedRes.body.message).toBe(
      "You have accessed a protected route!"
    );
  });
});
