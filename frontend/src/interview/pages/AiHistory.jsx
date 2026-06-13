import React, { useEffect } from "react";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../../components/shared/Navbar";
import { motion } from "framer-motion";

const AiHistory = () => {

    const navigate = useNavigate();

    const { user } = useSelector(
        store => store.auth
    );

    const {
        reports,
        getReports,
        loading
    } = useInterview();

    useEffect(() => {

        if (!user) {

            navigate("/login");

            return;
        }

        getReports();

    }, [user, navigate]);



    if (!user) {

        return null;
    }



    return (

        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">

            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-10">

                <div className="flex items-center justify-between mb-10">

                    <h1 className="text-4xl font-bold text-white">

                        AI Match Reports

                    </h1>



                </div>

                {
                    loading ? (

                        <div className="fixed inset-0 z-[9999] bg-[#111827] flex flex-col items-center justify-center">

                            <div className="w-16 h-16 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>

                            <p className="mt-5 text-gray-400 text-lg">
                                Please wait a few seconds...
                            </p>

                        </div>

                    ) : reports?.length === 0 ? (

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-center py-20 bg-gray-800/50 rounded-xl border border-gray-700"
                        >

                            <p className="text-gray-400 text-lg">

                                No AI reports generated yet.

                            </p>

                        </motion.div>

                    ) : (

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                            {
                                reports.map((report, index) => (

                                    <motion.div
                                        key={report._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.3,
                                            delay: index * 0.05
                                        }}
                                        onClick={() =>
                                            navigate(`/ai-report/${report._id}`)
                                        }
                                        className="cursor-pointer bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300"
                                    >

                                        <h2 className="text-xl font-bold text-white">

                                            {report.title || report.jobTitle}

                                        </h2>

                                        <p className="text-gray-400 mt-2">

                                            Generated on{" "}
                                            {
                                                new Date(
                                                    report.createdAt
                                                ).toLocaleDateString()
                                            }

                                        </p>

                                        <div className="mt-4">

                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium
                                                ${report.matchScore >= 80
                                                        ? "bg-green-500/20 text-green-400"
                                                        : report.matchScore >= 60
                                                            ? "bg-yellow-500/20 text-yellow-400"
                                                            : "bg-red-500/20 text-red-400"
                                                    }`}
                                            >

                                                Match Score: {report.matchScore}%

                                            </span>

                                        </div>

                                    </motion.div>
                                ))
                            }

                        </div>
                    )
                }

            </div>

        </div>
    );
};

export default AiHistory;