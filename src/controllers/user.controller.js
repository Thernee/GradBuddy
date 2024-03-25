import { StatusCodes } from "http-status-codes";
import { errorResponse, successResponse } from "../utils/responseHandle.js";
import db from "../../config/db.js";
import util from "util";
import catchError from "../utils/errorHandle.js";
import bcrypt from "bcrypt";

const promisifiedQuery = util.promisify(db.query).bind(db);

/**
 * get user details
 * @param req: The request object
 * @param res: The response object
 * @returns IErrorResponse
 * @returns ISuccessResponse
 */
export const getUser = catchError(async (req, res) => {
  const { user_id } = req.params;

  const getUserQuery = 'SELECT * FROM users WHERE user_id = ?';
  const user = await promisifiedQuery(getUserQuery, [user_id]);

  if (user.length === 0) {
    return errorResponse(res, 'No user found', StatusCodes.NOT_FOUND);
  }

  return successResponse(res, 'Query successful', user[0]);
});

/**
 * Get all users
 * @param req: The request object
 * @param res: The response object
 * @returns IErrorResponse
 * @returns ISuccessResponse
 */
export const getAllUsers = catchError(async (req, res) => {
  const getAllUsersQuery = 'SELECT * FROM users';
  const users = await promisifiedQuery(getAllUsersQuery);

  if (users.length === 0) {
    return errorResponse(res, 'No users found', StatusCodes.NOT_FOUND);
  }

  return successResponse(res, 'Query successful', users)
})

/**
 * update user
 * @param req: The request object
 * @param res: The response object
 * @returns IErrorResponse
 * @returns ISuccessResponse
 */
export const updateUser = catchError(async (req, res) => {
  const { user_id } = req.params;
  const updateDetails = req.body;

  // check if user exists in database, by user_id
  const checkQuery = 'SELECT * FROM users WHERE user_id = ?';
  const existingUser = await promisifiedQuery(checkQuery, [user_id]);

  if (existingUser.length === 0) {
    return errorResponse(res, 'No user found', StatusCodes.NOT_FOUND);
  }

  const updateUserQuery = 'UPDATE users SET ? WHERE user_id = ?';
  await promisifiedQuery(updateUserQuery, [updateDetails, user_id]);

  return successResponse(res, 'User updated successfully');
});

/**
 * delete user
 * @param req: The request object
 * @param res: The response object
 * @returns IErrorResponse
 * @returns ISuccessResponse
 */
export const deleteUser = catchError(async (req, res) => {
  const { user_id } = req.params;

  // check if user exists in database, by user_id
  const checkQuery = 'SELECT * FROM users WHERE user_id = ?';
  const existingUser = await promisifiedQuery(checkQuery, [user_id]);

  if (existingUser.length === 0) {
    return errorResponse(res, 'No user found', StatusCodes.NOT_FOUND);
  }

  const deleteUserQuery = 'DELETE FROM users WHERE user_id = ?';
  await promisifiedQuery(deleteUserQuery, [user_id]);

  return successResponse(res, 'User deleted successfully');
});

/**
 * update user password
 * @param req: The request object
 * @param res: The response object
 * @returns IErrorResponse
 * @returns ISuccessResponse
 */
export const updateUserPassword = catchError(async (req, res) => {
  const { user_id } = req.params;
  const { password, confirmPassword } = req.body;

  // check if password and confirm password match
  if (password !== confirmPassword) {
    return errorResponse(res, 'Passwords do not match', StatusCodes.BAD_REQUEST);
  }

  // check if user exists in database, by user_id
  const checkQuery = 'SELECT * FROM users WHERE user_id = ?';
  const existingUser = await promisifiedQuery(checkQuery, [user_id]);

  if (existingUser.length === 0) {
    return errorResponse(res, 'No user found', StatusCodes.NOT_FOUND);
  }

  // hash the given password
  const hashedPassword = await bcrypt.hash(password, 10);

  const updateUserQuery = 'UPDATE users SET password = ? WHERE user_id = ?';
  await promisifiedQuery(updateUserQuery, [hashedPassword, user_id]);
  
  return successResponse(res, 'User password updated successfully');
});
