import { StatusCodes } from "http-status-codes";
import { errorResponse, successResponse } from "../utils/responseHandle.js";
import db from "../../config/db.js";
import util from "util";
import catchError from "../utils/errorHandle.js";

const promisifiedQuery = util.promisify(db.query).bind(db);

/**
 * Get all available schools
 * @param req: The request object
 * @param res: The response object
 * @returns IErrorResponse
 * @returns ISuccessResponse
 **/
export const getSchools = catchError(async (req, res) => {
  const getSchoolsQuery = 'SELECT * FROM schools';
  const schools = await promisifiedQuery(getSchoolsQuery);

  if (schools.length === 0) {
    return errorResponse(res, 'No schools found', StatusCodes.NOT_FOUND);
  }

  return successResponse(res, 'Query successful', schools)
});

/**
 * Get specific school
 * @param req: The request object
 * @param res: The response object
 * @returns IErrorResponse
 * @returns ISuccessResponse
 **/
export const getSchool = catchError(async (req, res) => {
  const { school_id } = req.params;

  const getSchoolQuery = 'SELECT * FROM schools WHERE school_id = ?';
  const school = await promisifiedQuery(getSchoolQuery, [school_id]);

  if (school.length === 0) {
    return errorResponse(res, 'No school found', StatusCodes.NOT_FOUND);
  }

  return successResponse(res, 'Query successful', school[0]);
});

/**
 * Add new school
 * @param req The request object
 * @param res The response object
 * @returns IErrorResponse
 * @returns ISuccessResponse
 **/
export const addSchool = catchError(async (req, res) => {
  const { school_name, state, city, institutionalControl, rank, acceptanceRate, schoolWebsite } = req.body;

  // check if school exists in database, by school name
  const checkQuery = 'SELECT * FROM schools WHERE school_name = ?';
  const existingSchool = await promisifiedQuery(checkQuery, [school_name]);

  if (existingSchool.length > 0) {
    return errorResponse(res, 'School already exist', StatusCodes.BAD_REQUEST);
  }

  const insertQuery = 'INSERT INTO schools (school_name, state, city, institutionalControl, rank, acceptanceRate, schoolWebsite) VALUES (?, ?, ?, ?, ?, ?, ?)';
  await promisifiedQuery(insertQuery, [school_name, state, city, institutionalControl, rank, acceptanceRate, schoolWebsite]);

  return successResponse(res, 'School added successfully');
});

/**
 * Update school
 * @param req: The request object
 * @param res: The response object
 * @returns IErrorResponse
 * @returns ISuccessResponse
 **/
export const updateSchool = catchError(async (req, res) => {
  const { school_id } = req.params;
  const schoolUpdate = req.body;

  const checkQuery = 'SELECT * FROM schools WHERE school_id = ?';
  const existingSchool = await promisifiedQuery(checkQuery, [school_id]);

  if (existingSchool.length === 0) {
    return errorResponse(res, 'School not found', StatusCodes.NOT_FOUND);
  }

  const updateQuery = 'UPDATE schools SET ? WHERE school_id = ?';
  await promisifiedQuery(updateQuery, [schoolUpdate, school_id]);

  return successResponse(res, 'School updated successfully');
});

/**
 * Delete school
 * @param req: The request object
 * @param res: The response object
 * @returns IErrorResponse
 * @returns ISuccessResponse
 **/
export const deleteSchool = catchError(async (req, res) => {
  const { school_id } = req.params;

  const checkQuery = 'SELECT * FROM schools WHERE school_id = ?';
  const existingSchool = await promisifiedQuery(checkQuery, [school_id]);

  if (existingSchool.length === 0) {
    return errorResponse(res, 'School not found', StatusCodes.NOT_FOUND);
  }

  const deleteQuery = 'DELETE FROM schools WHERE school_id = ?';
  await promisifiedQuery(deleteQuery, [school_id]);
  
  return successResponse(res, 'School deleted successfully');
});
