import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../../utils/responseHandle.js";
import { body, validationResult } from "express-validator";

/**
 * Validate create criteria request body
 * @param req: The request object
 * @param res: The response object
 * @returns IValidationError
 */
export const validateCreateCriteria = [
  // body('school_id', 'School id is required and must be an integer')
  //   .trim()
  //   .notEmpty()
  //   .isInt(),

  body('graduateLevel', 'Graduate level is required')
    .trim()
    .notEmpty(),

  body('offersScholarships', 'Offers scholarships is required and must be a boolean')
    .isBoolean()
    .notEmpty(),

  body('requiresAppFee', 'Requires app fee is required and must be a boolean')
    .isBoolean()
    .notEmpty(),
  
  body('requiresGre', 'Requires GRE is required and must be a boolean')
    .isBoolean()
    .notEmpty(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array()[0].msg, StatusCodes.BAD_REQUEST);
    }

    return next();
  }

];

/**
 * Validate update criteria request body
 * @param req: The request object
 * @param res: The response object
 * @param next: The next function
 * @returns IValidationError
 */
export const validateUpdateCriteria = async (req, res, next) => {
  // const schoolIdCheck = body('school_id', 'School id is required and must be an integer')
  //   .notEmpty()
  //   .isInt()
  //   .run(req);

  const graduateLevelCheck = body('graduateLevel', 'Graduate level is required')
    .trim()
    .optional()
    .notEmpty()
    .run(req);

  const offersScholarshipsCheck = body('offersScholarships', 'Offers scholarships is required and must be a boolean')
    .optional()
    .isBoolean()
    .run(req);

  const requiresAppFeeCheck = body('requiresAppFee', 'Requires app fee is required and must be a boolean')
    .optional()
    .isBoolean()
    .run(req);

  const requiresGreCheck = body('requiresGre', 'Requires GRE is required and must be a boolean')
    .optional()
    .isBoolean()
    .run(req);

  await Promise.all([graduateLevelCheck, offersScholarshipsCheck, requiresAppFeeCheck, requiresGreCheck]);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return errorResponse(res, errors.array()[0].msg, StatusCodes.BAD_REQUEST);
  }

  return next();
};