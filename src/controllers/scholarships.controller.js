import { StatusCodes } from "http-status-codes";
import { errorResponse, successResponse } from "../utils/responseHandle.js";
import db from "../../config/db.js";
import util from "util";
import catchError from "../utils/errorHandle.js";

const promisifiedQuery = util.promisify(db.query).bind(db);

/**
 * Get all available scholarships
 * @param req: The request object
 * @param res: The response object
 * @returns IErrorResponse
 * @returns ISuccessResponse
 **/
export const getScholarships = catchError(async (req, res) => {
  const getScholarshipsQuery = 'SELECT * FROM scholarships';
  const scholarships = await promisifiedQuery(getScholarshipsQuery);

  if (scholarships.length === 0) {
    return errorResponse(res, 'No scholarships found', StatusCodes.NOT_FOUND);
  }

  return successResponse(res, 'Query successful', scholarships)
});

/**
 * Get specific scholarship
 * @param req: The request object
 * @param res: The response object
 * @returns IErrorResponse
 * @returns ISuccessResponse
 **/
export const getScholarship = catchError(async (req, res) => {
  const { scholarship_id } = req.params;

  const getScholarshipQuery = 'SELECT * FROM scholarships WHERE scholarship_id = ?';
  const scholarship = await promisifiedQuery(getScholarshipQuery, [scholarship_id]);

  if (scholarship.length === 0) {
    return errorResponse(res, 'No scholarship found', StatusCodes.NOT_FOUND);
  }

  return successResponse(res, 'Query successful', scholarship[0]);
});

/**
 * Get scholarships under a specific school
 * @param req: The request object
 * @param res: The response object
 * @returns IErrorResponse
 * @returns ISuccessResponse
 */
export const getScholarshipsBySchool = catchError(async (req, res) => {
  const { school_id } = req.params;

  const getScholarshipsQuery = 'SELECT * FROM scholarships WHERE school_id = ?';
  const scholarships = await promisifiedQuery(getScholarshipsQuery, [school_id]);

  if (scholarships.length === 0) {
    return errorResponse(res, 'No scholarships found', StatusCodes.NOT_FOUND);
  }

  return successResponse(res, 'Query successful', scholarships);
});

/**
 * Add new scholarship
 * @param req The request object
 * @param res The response object
 * @returns IErrorResponse
 * @returns ISuccessResponse
 **/
export const addScholarship = catchError(async (req, res) => {
  const { school_id, scholarship_name, scholarship_description, program, degree_level } = req.body;

  const idQuery = 'SELECT * FROM schools WHERE school_id = ?';
  const school = await promisifiedQuery(idQuery, [school_id]);

  if (school.length === 0) {
    return errorResponse(res, 'School not found', StatusCodes.NOT_FOUND);
  }

  const addScholarshipQuery = 'INSERT INTO scholarships (school_id, scholarship_name, scholarship_description, program, degree_level) VALUES (?, ?, ?, ?, ?)';
  await promisifiedQuery(addScholarshipQuery, [school_id, scholarship_name, scholarship_description, program, degree_level]);

  return successResponse(res, 'Scholarship added successfully');
});

/**
 * Update scholarship
 * @param req: The request object
 * @param res: The response object
 * @returns IErrorResponse
 * @returns ISuccessResponse
 **/
export const updateScholarship = catchError(async (req, res) => {
  const { scholarship_id } = req.params;
  const scholarshipUpdate = req.body;

  const idQuery = 'SELECT * FROM scholarships WHERE scholarship_id = ?';
  const scholarship = await promisifiedQuery(idQuery, [scholarship_id]);

  if (scholarship.length === 0) {
    return errorResponse(res, 'Scholarship not found', StatusCodes.NOT_FOUND);
  }

  const updateScholarshipQuery = 'UPDATE scholarships SET ? WHERE scholarship_id = ?';
  await promisifiedQuery(updateScholarshipQuery, [scholarshipUpdate, scholarship_id]);

  return successResponse(res, 'Scholarship updated successfully');
});

/**
 * Delete scholarship
 * @param req: The request object
 * @param res: The response object
 * @returns IErrorResponse
 * @returns ISuccessResponse
 **/
export const deleteScholarship = catchError(async (req, res) => {
  const { scholarship_id } = req.params;

  const idQuery = 'SELECT * FROM scholarships WHERE scholarship_id = ?';
  const scholarship = await promisifiedQuery(idQuery, [scholarship_id]);

  if (scholarship.length === 0) {
    return errorResponse(res, 'Scholarship not found', StatusCodes.NOT_FOUND);
  }

  const deleteScholarshipQuery = 'DELETE FROM scholarships WHERE scholarship_id = ?';
  await promisifiedQuery(deleteScholarshipQuery, [scholarship_id]);

  return successResponse(res, 'Scholarship deleted successfully');
});
