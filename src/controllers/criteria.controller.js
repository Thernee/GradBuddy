import { StatusCodes } from 'http-status-codes';
import util from 'util';
import db from '../../config/db';
import catchError from '../utils/errorHandle';
import { successResponse, errorResponse } from '../utils/responseHandle';

const promisifiedQuery = util.promisify(db.query).bind(db);

/**
 * Get criteria
 * @param req: The request object
 * @param res: The response object
 * @returns IErrorResponse
 * @returns ISuccessResponse
 * */
export const getCriteria = catchError(async (req, res) => {
  const { school_id } = req.params;

  const idQuery = 'SELECT * FROM schools WHERE school_id = ?';
  const school = await promisifiedQuery(idQuery, [school_id]);

  if (school.length === 0) {
    return errorResponse(res, 'School not found', StatusCodes.NOT_FOUND);
  }

  const getCriteriaQuery = 'SELECT * FROM schoolCriteria WHERE school_id = ?';
  const schoolCriteria = await promisifiedQuery(getCriteriaQuery, [school_id]);

  if (schoolCriteria.length === 0) {
    return errorResponse(res, 'No criteria found for given school', StatusCodes.NOT_FOUND);
  }

  return successResponse(res, 'Query successful', schoolCriteria)
});

/**
 * Add new criteria
 * @param req The request object
 * @param res The response object
 * @returns IErrorResponse
 * @returns ISuccessResponse
 * */
export const addCriteria = catchError(async (req, res) => {
  const { school_id } = req.params;
  const { graduateLevel, offersScholarships, requiresAppFee, requiresGre } = req.body;

  const idQuery = 'SELECT * FROM schools WHERE school_id = ?';
  const school = await promisifiedQuery(idQuery, [school_id]);

  if (school.length === 0) {
    return errorResponse(res, 'School not found', StatusCodes.NOT_FOUND);
  }

  const checkQuery = 'SELECT * FROM schoolCriteria WHERE school_id = ?';
  const existingCriteria = await promisifiedQuery(checkQuery, [school_id]);

  if (existingCriteria.length > 0) {
    return errorResponse(res, 'Criteria already exist for this school', StatusCodes.BAD_REQUEST);
  }

  const addCriteriaQuery  = 'INSERT INTO schoolCriteria (school_id, graduateLevel, offersScholarships, requiresAppFee, requiresGre) VALUES (?, ?, ?, ?, ?)';
  await promisifiedQuery(addCriteriaQuery, [school_id, graduateLevel, offersScholarships, requiresAppFee, requiresGre]);

  return successResponse(res, 'Criteria added successfully');
});

/**
 * Update criteria
 * @param req:  The request object
 * @param res: The response object
 * @returns IErrorResponse
 * @returns ISuccessResponse
 * */
export const updateCriteria = catchError(async (req, res) => {
  const { school_id } = req.params;
  const criteriaUpdate = req.body;

  const idQuery = 'SELECT * FROM schools WHERE school_id = ?';
  const school = await promisifiedQuery(idQuery, [school_id]);

  if (school.length === 0) {
    return errorResponse(res, 'School not found', StatusCodes.NOT_FOUND);
  }

  const checkQuery = 'SELECT * FROM schoolCriteria WHERE school_id = ?';
  const existingCriteria = await promisifiedQuery(checkQuery, [school_id]);

  if (existingCriteria.length === 0) {
    return errorResponse(res, 'Criteria not found for this school', StatusCodes.NOT_FOUND);
  }

  const updateCriteriaQuery = 'UPDATE schoolCriteria SET ? WHERE school_id = ?';
  await promisifiedQuery(updateCriteriaQuery, [criteriaUpdate, school_id]);

  return successResponse(res, 'Criteria updated successfully');
});

/**
 * Delete criteria
 * @param req: The request object
 * @param res: The response object
 * @returns IErrorResponse
 * @returns ISuccessResponse
 * */
export const deleteCriteria = catchError(async (req, res) => {
  const { school_id } = req.params;

  const idQuery = 'SELECT * FROM schools WHERE school_id = ?';
  const school = await promisifiedQuery(idQuery, [school_id]);

  if (school.length === 0) {
    return errorResponse(res, 'School not found', StatusCodes.NOT_FOUND);
  }

  const checkQuery = 'SELECT * FROM schoolCriteria WHERE school_id = ?';
  const existingCriteria = await promisifiedQuery(checkQuery, [school_id]);

  if (existingCriteria.length === 0) {
    return errorResponse(res, 'Criteria not found for this school', StatusCodes.NOT_FOUND);
  }

  const deleteCriteriaQuery = 'DELETE FROM schoolCriteria WHERE school_id = ?';
  await promisifiedQuery(deleteCriteriaQuery, [school_id]);

  return successResponse(res, 'Criteria deleted successfully');
})
