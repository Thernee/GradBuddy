import { StatusCodes } from "http-status-codes";
import { errorResponse, successResponse } from "../utils/responseHandle";
import db from "../../config/db";
import util from "util";
import catchError from "../utils/errorHandle";
import bcrypt from "bcrypt";

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

  const insertUserQuery = 'INSERT INTO users (username, fullname, email, password, nationality) VALUES (?, ?, ?, ?, ?)';
  await promisifiedQuery(insertUserQuery, [username, fullname, email, hashedPassword, nationality]);

  return successResponse(res, 'User created successfully');
});