import { getReasonPhrase } from "http-status-codes";

/**
 * HTTP success response
 * @param res The response object
 * @param message The success message
 * @param payload The payload 
 * @param statusCode HTTP status code (optional, defaults to 200)
 * @returns ISuccessResponse
 */
export const successResponse = (res, message, payload, statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        payload: { ...payload },
    });
};

/**
 * HTTP error response
 * @param res The response object
 * @param message The error message
 * @param statusCode HTTP status code
 * @returns IErrorResponse
 */
export const errorResponse = (res, message, statusCode) => {
    return res.status(statusCode).json({
        success: false,
        error: {
            type: getReasonPhrase(statusCode),
            code: statusCode,
            message,
        },
    });
};
