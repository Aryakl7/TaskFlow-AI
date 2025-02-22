const axios = require("axios");
const { GoogleAuth } = require("google-auth-library");

const getTaskSuggestion = async (inputText) => {
    try {
        console.log("Get task suggestion for : ",inputText);
        const response = await axios.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
            {
                contents: [
                    {parts : [
                        {text : `Suggest task names for : ${inputText}`}
                    ]}
                ]    
            },
            {
                headers: {"Content-Type": "application/json"},
                params: {key: "AIzaSyBS9GGt0a0Ay_ELLNIMsVk81Ol3EifLg8M"}
            }
        )
        console.log("Responses from Gemini : ".response);

        return response.data.candidates.slice(0,10)?.[0]?.content?.parts?.[0]?.text || "No suggestions";

        // return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No suggestions"
    } catch (error) {
        console.error("Error in API :",error?.response?.data || error.message);
        return "Error fetching in suggestions";
    }
}

const getTaskPrediction = async (inputText) => {
    try {
        console.log("Get task prediction for : ",inputText);
        const response = await axios.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
            {
                contents: [
                    {parts : [
                        {text : `Give answer in 1 line only. How much time it will take me to complete this task in hours: ${inputText}`}
                    ]}
                ]    
            },
            {
                headers: {"Content-Type": "application/json"},
                params: {key: "AIzaSyBS9GGt0a0Ay_ELLNIMsVk81Ol3EifLg8M"}
            }
        )
        console.log("Responses from Gemini : ".response);

        return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No time prediction";

        // return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No suggestions"
    } catch (error) {
        console.error("Error in API :",error?.response?.data || error.message);
        return "Error fetching in suggestions";
    }
}

module.exports = {getTaskSuggestion, getTaskPrediction};