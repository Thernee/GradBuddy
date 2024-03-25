import { StatusCodes } from "http-status-codes";
import { errorResponse, successResponse } from "../utils/responseHandle.js";
import db from "../../config/db.js";
import util from "util";
import catchError from "../utils/errorHandle.js";

const promisifiedQuery = util.promisify(db.query).bind(db);

/**
 * Get all favorites for a user
 * @param req: The request object
 * @param res: The response object
 * @returns IErrorResponse
 * @returns ISuccessResponse
 * */
export const getFavorites = catchError(async (req, res) => {
  const { user_id } = req.params;

  // check if user exists in database, by user_id
  const checkQuery = 'SELECT * FROM users WHERE user_id = ?';
  const existingUser = await promisifiedQuery(checkQuery, [user_id]);

  if (existingUser.length === 0) {
    return errorResponse(res, 'Invalid user', StatusCodes.NOT_FOUND);
  }

  const getFavoritesQuery = 'SELECT * FROM favorites WHERE user_id = ?';
  const favorites = await promisifiedQuery(getFavoritesQuery, [user_id]);

  if (favorites.length === 0) {
    return errorResponse(res, 'No favorites found', StatusCodes.NOT_FOUND);
  }

  return successResponse(res, 'Query successful', favorites)
});

/**
 * Add new favorites
 * @param req The request object
 * @param res The response object
 * @returns IErrorResponse
 * @returns ISuccessResponse
 * */
export const addFavorite = catchError(async (req, res) => {
  const { user_id } = req.params;
  const { school_id } = req.body;

  // chheck if school exists in database, by school_id
  const checkSchoolQuery = 'SELECT * FROM schools WHERE school_id = ?';
  const existingSchool = await promisifiedQuery(checkSchoolQuery, [school_id]);

  if (existingSchool.length === 0) {
    return errorResponse(res, 'Invalid school', StatusCodes.NOT_FOUND);
  }

  // check if favorite exists in database, by user_id and school_id
  const checkQuery = 'SELECT * FROM favorites WHERE user_id = ? AND school_id = ?';
  const existingFavorite = await promisifiedQuery(checkQuery, [user_id, school_id]);

  if (existingFavorite.length > 0) {
    return errorResponse(res, 'Favorite already exist for this user', StatusCodes.BAD_REQUEST);
  }

  const insertQuery = 'INSERT INTO favorites (user_id, school_id) VALUES (?, ?)';
  await promisifiedQuery(insertQuery, [user_id, school_id]);

  return successResponse(res, 'Favorite added successfully');
});

/**
 * Delete favorite
 * @param req: The request object
 * @param res: The response object
 * @returns IErrorResponse
 * @returns ISuccessResponse
 **/
export const deleteFavorite = catchError(async (req, res) => {
  const { user_id } = req.params;
  const { school_id } = req.body;

  const checkQuery = 'SELECT * FROM favorites WHERE user_id = ? AND school_id = ?';
  const existingFavorite = await promisifiedQuery(checkQuery, [user_id, school_id]);

  if (existingFavorite.length === 0) {
    return errorResponse(res, 'Favorite not found for this user', StatusCodes.NOT_FOUND);
  }

  const deleteQuery = 'DELETE FROM favorites WHERE user_id = ? AND school_id = ?';
  await promisifiedQuery(deleteQuery, [user_id, school_id]);

  return successResponse(res, 'Favorite deleted successfully');
});
