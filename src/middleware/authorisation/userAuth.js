import { StatusCodes } from "http-status-codes";
import db from '../../../config/db';
import util from "util";
import catchError from "../utils/errorHandle";
import jwt from "jsonwebtoken";

import { errorResponse } from "../../utils/responseHandle";

const promisifiedQuery = util.promisify(db.query).bind(db);

/**
 * Authenticate user
 * @param req: The request object
 * @param res: The response object
 * @returns IErrorResponse
 * @returns ISuccessResponse
 */
export const userAuth = catchError(async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return errorResponse(res, 'No token provided', StatusCodes.UNAUTHORIZED);
  }

  const token = header.split(' ')[1];

  if (!token) {
    return errorResponse(res, 'No token provided', StatusCodes.UNAUTHORIZED);
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const getUserQuery = 'SELECT * FROM users WHERE user_id = ?';
  const user = await promisifiedQuery(getUserQuery, [decoded.user_id]);

  if (user.length === 0) {
    return errorResponse(res, 'No user found', StatusCodes.NOT_FOUND);
  }

  // set user details in request object
  req.user = user[0];

  return next();
});
