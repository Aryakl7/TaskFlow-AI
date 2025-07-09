const axios = require("axios");
require("dotenv").config();

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const GEMINI_API_KEY = process.env.API_KEY;

const getTaskSuggestion = async (inputText) => {
    try {
        console.log("Get task suggestion for:", inputText);

        const response = await axios.post(
            GEMINI_API_URL,
            {
                contents: [
                    {
                        parts: [
                            { text: `Suggest task names for: ${inputText}` }
                        ]
                    }
                ]
            },
            {
                headers: { "Content-Type": "application/json" },
                params: { key: GEMINI_API_KEY }
            }
        );

        return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No suggestions";
    } catch (error) {
        console.error("Error in API:", error?.response?.data || error.message);
        return "Error fetching suggestions";
    }
};

const getTaskPrediction = async (inputText) => {
    try {
        console.log("Get task prediction for:", inputText);

        const response = await axios.post(
            GEMINI_API_URL,
            {
                contents: [
                    {
                        parts: [
                            { text: `Give answer in 1 line only. How much time it will take me to complete this task in hours: ${inputText}` }
                        ]
                    }
                ]
            },
            {
                headers: { "Content-Type": "application/json" },
                params: { key: GEMINI_API_KEY }
            }
        );

        return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No time prediction";
    } catch (error) {
        console.error("Error in API:", error?.response?.data || error.message);
        return "Error fetching prediction";
    }
};

module.exports = {
    getTaskSuggestion,
    getTaskPrediction
};
