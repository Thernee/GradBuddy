import { StatusCodes } from "http-status-codes";
import { errorResponse, successResponse } from "../utils/responseHandle";
import db from "../../config/db";
import util from "util";
import catchError from "../utils/errorHandle";

const promisifiedQuery = util.promisify(db.query).bind(db);

/**
 * Search schools based on criteria
 * @param req: The request object
 * @param res: The response object
 * @returns IErrorResponse
 * @returns ISuccessResponse
 */
export const searchSchools = catchError(async (req, res) => {
  const { criteria } = req.query;

  const searchQuery = 'SELECT * FROM schools WHERE school_name LIKE ?';
  const schools = await promisifiedQuery(searchQuery, [`%${criteria}%`]);

  if (schools.length === 0) {
    return errorResponse(res, 'No schools found', StatusCodes.NOT_FOUND);
  }

  return successResponse(res, 'Query successful', schools);
});
