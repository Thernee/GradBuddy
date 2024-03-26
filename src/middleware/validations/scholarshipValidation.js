import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../../utils/responseHandle.js";
import { body, validationResult } from "express-validator";

/**
 * Validate add scholarship request body
 * @param req: The request object
 * @param res: The response object
 * @param next: The next function
 * @returns IValidationError
 */
export const validateAddScholarship = async (req, res, next) => {
  const schoolIdCheck = body('school_id', 'School id is required and must be an integer')
    .notEmpty()
    .isInt()
    .run(req);

  const scholarshipNameCheck = body('scholarship_name', 'Scholarship name is required')
    .trim()
    .isLength({ min: 3 })
    .notEmpty()
    .run(req);

  const scholarshipDescriptionCheck = body('scholarship_description', 'Scholarship description is required')
    .trim()
    .isLength({ min: 8 })
    .notEmpty()
    .run(req);

  const programCheck = body('program', 'Program is required')
    .trim()
    .notEmpty()
    .run(req);

  const degreeLevelCheck = body('degree_level', 'Degree level is required')
    .trim()
    .notEmpty()
    .run(req);

  await Promise.all([schoolIdCheck, scholarshipNameCheck, scholarshipDescriptionCheck, programCheck, degreeLevelCheck]);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return errorResponse(res, errors.array()[0].msg, StatusCodes.BAD_REQUEST);
  }

  return next();
};

/**
 * Validate update scholarship request body
 * @param req: The request object
 * @param res: The response object
 * @param next: The next function
 * @returns IValidationError
 */
export const validateUpdateScholarship = async (req, res, next) => {
  const schoolIdCheck = body('school_id', 'School id is required and must be an integer')
    .optional()
    .notEmpty()
    .isInt()
    .run(req);

  const scholarshipNameCheck = body('scholarship_name', 'Scholarship name is required and must be greater than 3 characters')
    .trim()
    .optional()
    .isLength({ min: 3 })
    .run(req);

  const scholarshipDescriptionCheck = body('scholarship_description', 'Scholarship description is required and must be greater than 8 characters')
    .trim()
    .optional()
    .isLength({ min: 8 })
    .run(req);

  const programCheck = body('program', 'Program is required')
    .trim()
    .optional()
    .notEmpty()
    .run(req);

  const degreeLevelCheck = body('degree_level', 'Degree level is required')
    .trim()
    .optional()
    .notEmpty()
    .run(req);

  await Promise.all([schoolIdCheck, scholarshipNameCheck, scholarshipDescriptionCheck, programCheck, degreeLevelCheck]);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return errorResponse(res, errors.array()[0].msg, StatusCodes.BAD_REQUEST);
  }

  return next();
};