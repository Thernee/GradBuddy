import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../../utils/responseHandle";
import { body, validationResult } from "express-validator";

/**
 * Validate register user request body
 * @param req: The request object
 * @param res: The response object
 * @param next: The next function
 * @returns IValidationError
 */
export const validateRegisterUser = async (req, res, next) => {
  const fullNameCheck = body('fullname', 'Full name is required')
    .trim()
    .isLength({ min: 3 })
    .run(req);

  const emailCheck = body('email', 'Email is required')
    .trim()
    .isEmail()
    .run(req);

  const usernameCheck = body('username', 'Username is required')
    .trim()
    .isLength({ min: 3 })
    .run(req);

  const passwordCheck = body('password', 'Password is required')
    .trim()
    .isLength({ min: 8 })
    .run(req);

  const confirmPasswordCheck = body('confirmPassword', 'Confirm password is required')
    .trim()
    .isLength({ min: 8 })
    .run(req);

  const nationalityCheck = body('nationality', 'Nationality is required')
    .trim()
    .isLength({ min: 3 })
    .run(req);

  await Promise.all([fullNameCheck, emailCheck, usernameCheck, passwordCheck, confirmPasswordCheck, nationalityCheck]);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return errorResponse(res, errors.array()[0].msg, StatusCodes.BAD_REQUEST);
  }

  return next();
};

/**
 * Validate login user request body
 * @param req: The request object
 * @param res: The response object
 * @param next: The next function
 * @returns IValidationError
 */
export const validateLoginUser = async (req, res, next) => {
  const emailCheck = body('email', 'Email is required')
    .trim()
    .optional()
    .isEmail()
    .run(req);

  const usernameCheck = body('username', 'Username is required')
    .trim()
    .optional()
    .isLength({ min: 3 })
    .run(req);

  const passwordCheck = body('password', 'Password is required')
    .trim()
    .isLength({ min: 8 })
    .run(req);

  await Promise.all([emailCheck, passwordCheck]);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return errorResponse(res, errors.array()[0].msg, StatusCodes.BAD_REQUEST);
  }

  return next();
};

