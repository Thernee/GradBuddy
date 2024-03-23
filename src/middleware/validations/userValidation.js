import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../../utils/responseHandle.js";
import { body, validationResult } from "express-validator";

/**
 * Validate update user request body
 * @param req: The request object
 * @param res: The response object
 * @param next: The next function
 * @returns IValidationError
 */
export const validateUpdateUser = async (req, res, next) => {
  const fullNameCheck = body('fullname', 'Full name is required')
    .optional()
    .trim()
    .isLength({ min: 3 })
    .notEmpty()
    .run(req);

  const emailCheck = body('email', 'Email is required')
    .optional()
    .trim()
    .isEmail()
    .run(req);

  const usernameCheck = body('username', 'Username is required')
    .optional()
    .trim()
    .isLength({ min: 3 })
    .run(req);

  const nationalityCheck = body('nationality', 'Nationality is required')
    .optional()
    .trim()
    .isLength({ min: 3 })
    .run(req);

  await Promise.all([fullNameCheck, emailCheck, usernameCheck, nationalityCheck]);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return errorResponse(res, errors.array()[0].msg, StatusCodes.BAD_REQUEST);
  }

  return next();
}

/**
 * Validate update pssword request body
 * @param req: The request object
 * @param res: The response object
 * @param next: The next function
 * @returns IValidationError
 */
export const validateUpdatePassword = async (req, res, next) => {
  const passwordCheck = body('password', 'Password is required')
    .trim()
    .isLength({ min: 8 })
    .run(req);

  const confirmPasswordCheck = body('confirmPassword', 'Confirm password is required')
    .trim()
    .isLength({ min: 8 })
    .run(req);

  await Promise.all([passwordCheck, confirmPasswordCheck]);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return errorResponse(res, errors.array()[0].msg, StatusCodes.BAD_REQUEST);
  }

  return next();
};