import { successResponse, errorResponse } from "./utils/responseHandle";
import routes from "./routes/index";
import express from "express";
import cors from "cors";
import { StatusCodes } from "http-status-codes";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mount routes to /v1
app.use("/v1", routes);

// Index route
app.get("/", (req, res) => {
  return successResponse(res, "Welcome to the Gradbuddy School  API");
});

// Catch all unhandled routes
app.all("*", (req, res) => {
  return errorResponse(res, `Resource ${req.originalUrl} not found`, StatusCodes.NOT_FOUND);
});

// Catch all errors
app.use((err, req, res, next) => {
  let errorMesage;

  if (process.env.NODE_ENV === "development") {
    errorMesage = err.message;
  } else {
    errorMesage = "Internal server error";
  }

  return errorResponse(res, errorMesage, StatusCodes.INTERNAL_SERVER_ERROR);
});

export default app;

