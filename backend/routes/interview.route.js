import express from "express"

import isAuthenticated from "../middlewares/isAuthenticated.js"

import interviewController from "../controllers/interview.controller.js"

const interviewRouter = express.Router()



/**
 * @route POST /api/interview/
 * @description Generate AI Match Report
 * @access Private
 */
interviewRouter.post(
    "/",
    isAuthenticated,
    interviewController.generateAiMatchReportController
)



/**
 * @route GET /api/interview/report/:interviewId
 * @description Get interview report by ID
 * @access Private
 */
interviewRouter.get(
    "/report/:interviewId",
    isAuthenticated,
    interviewController.getInterviewReportByIdController
)



/**
 * @route GET /api/interview/
 * @description Get all interview reports
 * @access Private
 */
interviewRouter.get(
    "/",
    isAuthenticated,
    interviewController.getAllInterviewReportsController
)



/**
 * @route POST /api/interview/resume/pdf/:interviewReportId
 * @description Generate ATS optimized resume PDF
 * @access Private
 */
interviewRouter.post(
    "/resume/pdf/:interviewReportId",
    isAuthenticated,
    interviewController.generateResumePdfController
)



export default interviewRouter