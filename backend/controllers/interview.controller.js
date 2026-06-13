import axios from "axios";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";


import {
    generateInterviewReport,
    generateResumePdf
} from "../services/ai.service.js";

import interviewReportModel from "../models/interviewReport.model.js";

import redis from "../utils/redis.js";



/**
 * @description Generate AI Match Report
 * Resume is fetched automatically from user's profile resume URL
 */
async function generateAiMatchReportController(req, res) {

    try {

        const {
            jobTitle,
            selfDescription,
            jobDescription,
            resumeUrl
        } = req.body;

        if (!resumeUrl) {

            return res.status(400).json({
                success: false,
                message: "Upload Resume first in profile"
            });
        }

        // Redis Cache Key
        const cacheKey =
            `report:${req.id}:${jobTitle}:${resumeUrl}`;
        // Check Redis First
        const cachedReport = await redis.get(cacheKey);

        if (cachedReport) {

            return res.status(200).json({

                success: true,

                source: "redis",

                message: "AI Match report fetched from cache",

                interviewReport: JSON.parse(cachedReport)
            });
        }

        // Fetch Resume PDF
        const pdfResponse = await axios.get(resumeUrl, {
            responseType: "arraybuffer"
        });

        const uint8Array = new Uint8Array(pdfResponse.data);

        const loadingTask = pdfjsLib.getDocument({
            data: uint8Array
        });

        const pdf = await loadingTask.promise;

        let extractedText = "";

        for (let i = 1; i <= pdf.numPages; i++) {

            const page = await pdf.getPage(i);

            const textContent = await page.getTextContent();

            const pageText = textContent.items
                .map(item => item.str)
                .join(" ");

            extractedText += pageText + "\n";
        }

        // Gemini AI Call
        const interViewReportByAi = await generateInterviewReport({

            jobTitle,

            resume: extractedText,

            selfDescription,

            jobDescription
        });

        // Save to MongoDB
        const interviewReport = await interviewReportModel.create({

            user: req.id,

            jobTitle,

            resume: extractedText,

            selfDescription,

            jobDescription,

            ...interViewReportByAi
        });

        // Save to Redis (2 hours)
        await redis.set(
            cacheKey,
            JSON.stringify(interviewReport),
            "EX",
            7200
        );

        // Clear History Cache
        await redis.del(`history:${req.id}`);

        return res.status(201).json({

            success: true,

            source: "mongodb",

            message: "AI Match report generated successfully",

            interviewReport
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: "The AI service is currently experiencing high demand. Please try again in a few moments."
        });
    }
}



/**
 * @description Get AI Match Report by ID
 */
async function getInterviewReportByIdController(req, res) {

    try {

        const { interviewId } = req.params;

        const interviewReport = await interviewReportModel.findOne({

            _id: interviewId,

            user: req.id
        });

        if (!interviewReport) {

            return res.status(404).json({

                success: false,

                message: "Interview report not found"
            });
        }

        return res.status(200).json({

            success: true,

            message: "Interview report fetched successfully",

            interviewReport
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: "Failed to fetch interview report"
        });
    }
}



/**
 * @description Get All AI Match Reports
 */
async function getAllInterviewReportsController(req, res) {

    try {

        const cacheKey = `history:${req.id}`;

        // Check Redis Cache
        const cachedReports = await redis.get(cacheKey);

        if (cachedReports) {

            return res.status(200).json({

                success: true,

                source: "redis",

                message: "Interview reports fetched from cache",

                interviewReports: JSON.parse(cachedReports)
            });
        }

        // Fetch from MongoDB
        const interviewReports = await interviewReportModel
            .find({ user: req.id })
            .sort({ createdAt: -1 })
            .select(
                "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan"
            );

        // Store in Redis (10 minutes)
        await redis.set(
            cacheKey,
            JSON.stringify(interviewReports),
            "EX",
            600
        );

        return res.status(200).json({

            success: true,

            source: "mongodb",

            message: "Interview reports fetched successfully",

            interviewReports
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: "Failed to fetch reports"
        });
    }
}



/**
 * @description Generate ATS Optimized Resume PDF
 */
async function generateResumePdfController(req, res) {

    try {

        const { interviewReportId } = req.params;

        const interviewReport = await interviewReportModel.findById(interviewReportId);

        if (!interviewReport) {

            return res.status(404).json({

                success: false,

                message: "Interview report not found"
            });
        }

        const {
            jobTitle,
            resume,
            jobDescription,
            selfDescription
        } = interviewReport;

        // Generate HTML Resume
        const pdfBuffer = await generateResumePdf({

            jobTitle,

            resume,

            jobDescription,

            selfDescription
        });

      

        // Send PDF
        res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`,
    "Content-Length": pdfBuffer.length
});

return res.end(pdfBuffer);
    } catch (error) {

    console.log("PDF GENERATION ERROR:", error.message);
    console.log(error.stack);


        return res.status(500).json({

            success: false,

            message: "The AI service is currently experiencing high demand. Please try again in a few moments."
        });
    }
}



export default {

    generateAiMatchReportController,

    getInterviewReportByIdController,

    getAllInterviewReportsController,

    generateResumePdfController
};