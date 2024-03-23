import { StatusCodes } from "http-status-codes";
import { errorResponse, successResponse } from "../utils/responseHandle.js";
import db from "../../config/db.js";
import util from "util";
import catchError from "../utils/errorHandle.js";

const promisifiedQuery = util.promisify(db.query).bind(db);

/**
 * Search schools based on criteria
 * @param req: The request object
 * @param res: The response object
 * @returns IErrorResponse
 * @returns ISuccessResponse
 */
export const searchSchools = catchError(async (req, res) => {
  const { school_name, state, city, institutionalControl, rank, acceptanceRate } = req.query;

  let searchQuery = 'SELECT * FROM schools WHERE 1 = 1';

  // Add conditions for each search criteria
  const conditions = [];
  const values = [];

  if (school_name) {
    conditions.push('school_name LIKE ?');
    values.push(`%${school_name}%`);
  }
  if (state) {
    conditions.push('state = ?');
    values.push(state);
  }
  if (city) {
    conditions.push('city = ?');
    values.push(city);
  }
  if (institutionalControl) {
    conditions.push('institutionalControl = ?');
    values.push(institutionalControl);
  }
  if (rank) {
    conditions.push('rank = ?');
    values.push(rank);
  }
  if (acceptanceRate) {
    conditions.push('acceptanceRate = ?');
    values.push(acceptanceRate);
  }

  // Combine conditions into the WHERE clause of the query
  if (conditions.length > 0) {
    searchQuery += ' AND ' + conditions.join(' AND ');
  }

  const schools = await promisifiedQuery(searchQuery, values);

  if (schools.length === 0) {
    return errorResponse(res, 'No schools found', StatusCodes.NOT_FOUND);
  }

  return successResponse(res, 'Query successful', schools);
});
