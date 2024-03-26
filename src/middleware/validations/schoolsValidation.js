import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../../utils/responseHandle.js";
import { body, validationResult } from "express-validator";

/**
 * Validate create school request body
 * @param req: The request object
 * @param res: The response object
 * @param next: The next function
 * @returns IValidationError
 */
export const validateCreateSchool = async (req, res, next) => {
  const schoolNameCheck = body('school_name', 'School name is required')
    .trim()
    .isLength({ min: 3 })
    .notEmpty()
    .run(req);

  const stateCheck = body('state', 'State is required')
    .trim()
    .notEmpty()
    .run(req);

  const cityCheck = body('city', 'City is required')
    .trim()
    .notEmpty()
    .run(req);

  const institutionalControlCheck = body('institutionalControl', 'Institutional control is required')
    .trim()
    .notEmpty()
    .run(req);

  const rankCheck = body('rank', 'Rank is required')
    .trim()
    .notEmpty()
    .run(req);

  const acceptanceRateCheck = body('acceptanceRate', 'Acceptance rate is required')
    .trim()
    .notEmpty()
    .isFloat()
    .run(req);

  const schoolWebsiteCheck = body('schoolWebsite', 'School website is required')
    .trim()
    .optional()
    .notEmpty()
    .run(req);

  await Promise.all([schoolNameCheck, stateCheck, cityCheck, institutionalControlCheck, rankCheck, acceptanceRateCheck, schoolWebsiteCheck]);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return errorResponse(res, errors.array()[0].msg, StatusCodes.BAD_REQUEST);
  }

  return next();
};

/**
 * Validate update school request body
 * @param req: The request object
 * @param res: The response object
 * @param next: The next function
 * @returns IValidationError
 */
export const validateUpdateSchool = async (req, res, next) => {
  const schoolNameCheck = body('school_name', 'School name is required')
    .trim()
    .optional()
    .isLength({ min: 3 })
    .notEmpty()
    .run(req);

  const stateCheck = body('state', 'State is required')
    .trim()
    .optional()
    .notEmpty()
    .run(req);

  const cityCheck = body('city', 'City is required')
    .trim()
    .optional()
    .notEmpty()
    .run(req);

  const institutionalControlCheck = body('institutionalControl', 'Institutional control is required')
    .trim()
    .optional()
    .notEmpty()
    .run(req);

  const rankCheck = body('rank', 'Rank is required')
    .trim()
    .optional()
    .notEmpty()
    .run(req);

  const acceptanceRateCheck = body('acceptanceRate', 'Acceptance rate is required')
    .trim()
    .optional()
    .isFloat()
    .run(req);

  const schoolWebsiteCheck = body('schoolWebsite', 'School website is required')
    .trim()
    .optional()
    .notEmpty()
    .run(req);

  await Promise.all([schoolNameCheck, stateCheck, cityCheck, institutionalControlCheck, rankCheck, acceptanceRateCheck, schoolWebsiteCheck]);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return errorResponse(res, errors.array()[0].msg, StatusCodes.BAD_REQUEST);
  }

  return next();
};
