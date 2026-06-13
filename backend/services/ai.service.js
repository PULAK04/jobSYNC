import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import PDFDocument from "pdfkit";

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

const interviewReportSchema1 = z.object({

    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job description"),

    technicalQuestions: z.array(
        z.string()
    ).describe(
        "Technical questions that can be asked in the interview along with their intention and how to answer them"
    ),

    behavioralQuestions: z.array(
        z.string()
    ).describe(
        "Behavioral questions that can be asked in the interview along with their intention and how to answer them"
    ),

    skillGaps: z.array(
        z.string()
    ).describe(
        "The skills which the candidate is lacking, based on the job description and candidate profile"
    ),

    preparationPlan: z.array(
        z.string()
    ).describe(
        "A day-wise preparation plan for the candidate to prepare for the interview effectively"
    ),

    title: z.string().describe("The title of the job for which the interview report is generated")
});

const resumePdfSchema = z.object({

    name: z.string().describe("Candidate name if available otherwise empty string"),

    title: z.string().describe("Target role title"),

    contact: z.array(
        z.string()
    ).describe("Contact details such as email, phone, location, LinkedIn, GitHub"),

    summary: z.string().describe("ATS optimized professional summary"),

    skills: z.array(
        z.string()
    ).describe("Relevant technical skills"),

    education: z.array(
        z.string()
    ).describe("Education details"),

    projects: z.array(
        z.string()
    ).describe("Project bullet points optimized for ATS"),

    experience: z.array(
        z.string()
    ).describe("Experience, internships, or positions of responsibility"),

    achievements: z.array(
        z.string()
    ).describe("Candidate achievements"),

    certifications: z.array(
        z.string()
    ).describe("Certifications if available, otherwise empty array")
});

async function generateInterviewReport({
    jobTitle,
    resume,
    selfDescription,
    jobDescription
}) {

    const prompt = `
Generate a COMPLETE interview report.

IMPORTANT RULES:

1. Return ONLY valid JSON.
2. Do NOT return markdown.
3. Do NOT return explanations.
4. Every array item MUST be a STRING.
5. Follow the schema EXACTLY.
6. Strictly follow the given example format.

Example format:

{
  "matchScore": 85,

  "technicalQuestions": [
    "Explain the concept of Context API in React and how it can be used for state management.",
    "Explain the concept of Virtual DOM in React and how it improves performance."
  ],

  "behavioralQuestions": [
    "Tell me about a time when you had to work with a difficult team member and how you handled the situation.",
    "Tell me about a challenge you faced in your previous project and how you overcame it."
  ],

  "skillGaps": [
    "Familiarity with cloud service providers such as AWS, Azure, or GCP.",
    "Knowledge of containerization tools like Docker and Kubernetes."
  ],

  "preparationPlan": [
    "Day 1: Advanced Node.js and Asynchronous Patterns. Deep dive into Node.js internals including the event loop, promises, async/await and error handling. Practice building APIs with proper error middleware and validation. Study performance bottlenecks and memory leaks in Express applications.",
    "Day 2: System Design and Scalability. Focus on designing scalable backend architectures that can handle high traffic. Study caching, load balancing, database indexing, sharding and queue-based processing. Practice explaining trade-offs clearly."
  ],

  "title": "${jobTitle}"
}

Generate:
- matchScore
- 8 technicalQuestions
- 8 behavioralQuestions
- 5 skillGaps
- 7 preparationPlan days with day number, focus and detailed tasks
- title

Candidate Details:

Job Title:
${jobTitle}

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;

    const response = await ai.models.generateContent({

        model: "gemini-2.5-flash",

        contents: prompt,

        config: {

            responseMimeType: "application/json",

            responseSchema:
                zodToJsonSchema(interviewReportSchema1)
        }
    });

    const jsonData = JSON.parse(response.text);

    const validatedData =
        interviewReportSchema1.parse(jsonData);

    return validatedData;
}

async function generateResumePdf({

    jobTitle,

    resume,

    selfDescription,

    jobDescription

}) {

    const prompt = `
You are an expert ATS resume writer.

Generate an ATS-optimized resume tailored for the given job description.

IMPORTANT RULES:

1. Return ONLY valid JSON.
2. Do NOT return markdown.
3. Do NOT use triple backticks.
4. Do NOT invent fake companies, fake internships, fake jobs, fake degrees, fake certificates, or fake achievements.
5. Use only the candidate's real resume data and self description.
6. Improve wording professionally.
7. Add job-relevant keywords naturally from the job description.
8. Make the resume sound human-written, not AI-generated.
9. Keep it suitable for a final-year engineering student.
10. Keep content concise and suitable for a 1-page or maximum 2-page resume.
11. Every field must be present.
12. If any field has no data, return an empty array or empty string.
13. Every array item MUST be a STRING.
14. Strictly follow this JSON structure.

Example format:

{
  "name": "Pulak",
  "title": "Full Stack Developer",
  "contact": [
    "pulak@example.com",
    "GitHub: github.com/PULAK04",
    "LinkedIn: linkedin.com/in/pulak"
  ],
  "summary": "Final-year engineering student with strong experience in full-stack development, data structures and algorithms, and AI-powered web applications.",
  "skills": [
    "C++",
    "JavaScript",
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Redis",
    "REST APIs"
  ],
  "education": [
    "B.Tech in Electronics and Communication Engineering, NIT Jamshedpur"
  ],
  "projects": [
    "Built an AI-powered recruitment platform using React.js, Node.js, Express.js, MongoDB, Redis, and Gemini AI.",
    "Integrated AI-based job matching, ATS resume generation, skill-gap analysis, interview preparation workflows, and recruiter-side applicant management."
  ],
  "experience": [
    "Member, Corporate Affairs, SECE NIT Jamshedpur; contributed to sponsorship and outreach activities."
  ],
  "achievements": [
    "Solved 550+ DSA and competitive programming problems across LeetCode, GeeksforGeeks, and CodeChef."
  ],
  "certifications": []
}

Candidate Details:

Target Job Title:
${jobTitle}

Candidate Resume:
${resume}

Candidate Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;

    const response = await ai.models.generateContent({

        model: "gemini-2.5-flash",

        contents: prompt,

        config: {

            responseMimeType: "application/json",

            responseSchema:
                zodToJsonSchema(resumePdfSchema)
        }
    });

    let cleanText = response.text;

    cleanText = cleanText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    const jsonData = JSON.parse(cleanText);

    const validatedResumeData =
        resumePdfSchema.parse(jsonData);

    
console.log("AI GENERATED RESUME DATA:", validatedResumeData);

    return await generatePdfUsingPdfKit(validatedResumeData);
}
 
function generatePdfUsingPdfKit(resumeData) {

    return new Promise((resolve, reject) => {

        const doc = new PDFDocument({
            size: "A4",
            margin: 42
        });

        const buffers = [];

        doc.on("data", buffers.push.bind(buffers));

        doc.on("end", () => {

            const pdfBuffer = Buffer.concat(buffers);

            resolve(pdfBuffer);
        });

        doc.on("error", reject);

        doc
            .font("Helvetica-Bold")
            .fontSize(20)
            .fillColor("#111111")
            .text(resumeData.name || "Candidate Resume", {
                align: "center"
            });

        doc
            .moveDown(0.2)
            .font("Helvetica")
            .fontSize(11)
            .fillColor("#333333")
            .text(resumeData.title || "Software Developer", {
                align: "center"
            });

        if (resumeData.contact && resumeData.contact.length > 0) {

            doc
                .moveDown(0.3)
                .font("Helvetica")
                .fontSize(8.7)
                .fillColor("#444444")
                .text(resumeData.contact.join(" | "), {
                    align: "center"
                });
        }

        doc.moveDown(0.8);

        if (resumeData.summary) {

            addSectionTitle(doc, "PROFESSIONAL SUMMARY");

            doc
                .font("Helvetica")
                .fontSize(9.5)
                .fillColor("#111111")
                .text(resumeData.summary, {
                    align: "justify",
                    lineGap: 2
                });

            doc.moveDown(0.6);
        }

        if (resumeData.skills && resumeData.skills.length > 0) {

            addSectionTitle(doc, "TECHNICAL SKILLS");

            doc
                .font("Helvetica")
                .fontSize(9.5)
                .fillColor("#111111")
                .text(resumeData.skills.join(" | "), {
                    lineGap: 2
                });

            doc.moveDown(0.6);
        }

        addStringArraySection(doc, "EDUCATION", resumeData.education);

        addStringArraySection(doc, "PROJECTS", resumeData.projects);

        addStringArraySection(doc, "EXPERIENCE / RESPONSIBILITIES", resumeData.experience);

        addStringArraySection(doc, "ACHIEVEMENTS", resumeData.achievements);

        addStringArraySection(doc, "CERTIFICATIONS", resumeData.certifications);

        doc.end();
    });
}

function addSectionTitle(doc, title) {

    checkPageBreak(doc);

    doc
        .font("Helvetica-Bold")
        .fontSize(11.5)
        .fillColor("#111111")
        .text(title);

    doc
        .moveTo(42, doc.y + 2)
        .lineTo(553, doc.y + 2)
        .strokeColor("#888888")
        .lineWidth(0.5)
        .stroke();

    doc.moveDown(0.45);
}

function addStringArraySection(doc, title, items) {

    if (!items || items.length === 0) {
        return;
    }

    addSectionTitle(doc, title);

    items.forEach((item) => {

        checkPageBreak(doc);

        doc
            .font("Helvetica")
            .fontSize(9.5)
            .fillColor("#111111")
            .text(`• ${item}`, {
                indent: 10,
                lineGap: 2
            });
    });

    doc.moveDown(0.6);
}

function checkPageBreak(doc) {

    if (doc.y > 745) {
        doc.addPage();
    }
}

export {
    generateInterviewReport,
    generateResumePdf
};