import { StatusCodes } from 'http-status-codes';
import util from 'util';
import db from '../../config/db';
import catchError from '../utils/errorHandle';
import { successResponse, errorResponse } from '../utils/responseHandle';

const promisifiedQuery = util.promisify(db.query).bind(db);

export const getCriteria = catchError(async (req, res) => {
  const { school_id } = req.params;

  const idQuery = 'SELECT * FROM schools WHERE school_id = ?';
  const school = await promisifiedQuery(idQuery, [school_id]);

  if (school.length === 0) {
    return errorResponse(res, 'School not found', StatusCodes.NOT_FOUND);
  }

  const criteriaQuery = 'SELECT * FROM schoolCriteria WHERE school_id = ?';
  const schoolCriteria = await promisifiedQuery(criteriaQuery, [school_id]);

  if (schoolCriteria.length === 0) {
    return errorResponse(res, 'No criteria found for given school', StatusCodes.NOT_FOUND);
  }

  return successResponse(res, 'Query successful', schoolCriteria)
});
