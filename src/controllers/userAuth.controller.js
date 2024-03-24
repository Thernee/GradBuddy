import { StatusCodes } from "http-status-codes";
import { errorResponse, successResponse } from "../utils/responseHandle.js";
import db from "../../config/db.js";
import util from "util";
import catchError from "../utils/errorHandle.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';

const promisifiedQuery = util.promisify(db.query).bind(db);

/**
 * Register new user
 * @param req: The request object
 * @param res: The response object
 * @returns IErrorResponse
 * @returns ISuccessResponse
 * @returns IErrorResponse
 */
export const registerUser = catchError(async (req, res) => {
  const { username, fullname, email, password, confirmPassword, nationality } = req.body;

  // check if user exists in database, by username
  const checkQuery = 'SELECT * FROM users WHERE username = ?';
  const existingUser = await promisifiedQuery(checkQuery, [username]);

  if (existingUser.length > 0) {
    return errorResponse(res, 'User already exists', StatusCodes.BAD_REQUEST);
  }

  if (password !== confirmPassword) {
    return errorResponse(res, 'Passwords do not match', StatusCodes.BAD_REQUEST);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user_id = uuidv4();

  const insertUserQuery = 'INSERT INTO users (user_id, username, fullname, email, password, nationality) VALUES (?, ?, ?, ?, ?, ?)';
  await promisifiedQuery(insertUserQuery, [user_id, username, fullname, email, hashedPassword, nationality]);

  return successResponse(res, 'User created successfully');
});

/**
 * Login user
 * @param req: The request object
 * @param res: The response object
 * @returns IErrorResponse
 * @returns ISuccessResponse
 * @returns IErrorResponse
 */
export const loginUser = catchError(async (req, res) => {
  const { username, email, password } = req.body;

  // check if user exists in database, by username or email
  const checkQuery = 'SELECT * FROM users WHERE username = ? OR email = ?';
  const existingUser = await promisifiedQuery(checkQuery, [username, email]);

  if (existingUser.length === 0) {
    return errorResponse(res, 'Invalid username or email', StatusCodes.UNAUTHORIZED);
  }

  const user = existingUser[0];

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return errorResponse(res, 'Invalid password', StatusCodes.UNAUTHORIZED);
  }

  const token = jwt.sign({ user_id: user.user_id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h'});

  return successResponse(res, 'Login successful', { token });
});

/**
 * Logout user
 * @param req: The request object
 * @param res: The response object
 * @returns IErrorResponse
 * @returns ISuccessResponse
 */
export const logoutUser = catchError(async (req, res) => {
  const { token } = req.body;
})
