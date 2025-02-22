const Task = require("../model/Task");
const {getTaskSuggestion, getTaskPrediction} = require("../services/aiService");

// Get Auto-Suggestion
exports.suggestTask = async (req, res) => {
    const {input} = req.body;
    const suggestions = await getTaskSuggestion(input);
    res.json({suggestions});
}

exports.createTask = async (req, res) => {
    const {taskTitle, taskDesc, assignedEmp} = req.body;
    const estimatedTime = await getTaskPrediction(taskDesc);
    const task = new Task({taskTitle, taskDesc, assignedEmp, estimatedTime});
    await task.save();
    res.json(task);
}


exports.getAllTask = async(req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({error : "Internal server error"})
    }
}