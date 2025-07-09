import axios from "axios";
import { useState } from "react";

export const TaskManagement = ({ employees }) => {
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDesc, setTaskDesc] = useState("");
    const [assignedEmp, setAssignedEmp] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [predictingTime, setPredictingTime] = useState(null);

    // Fetch AI-based task suggestions
    const handleTaskSuggestion = async () => {
        if (taskTitle.length > 3) {
            try {
                const response = await axios.post("http://localhost:5501/api/task/suggest", {
                    input: taskTitle
                });

                const suggestionList = response.data.suggestions?.split("\n") || [];
                setSuggestions(suggestionList);
                console.log("AI Suggestions:", suggestionList);
            } catch (error) {
                console.error("Error while fetching suggestions:", error);
            }
        } else {
            console.warn("Please enter at least 4 characters to generate suggestions.");
        }
    };

    // Assign the task to the selected employee
    const handleAssignTask = async () => {
        try {
            if (!taskTitle || !taskDesc || !assignedEmp || assignedEmp === "Select Employee") {
                alert("Please fill in all fields correctly before assigning a task.");
                return;
            }

            const res = await axios.post("http://localhost:5501/api/task/createTask", {
                taskTitle,
                taskDesc,
                assignedEmp
            });

            console.log("Task Assigned Successfully:", res.data);
            // Reset fields
            setTaskTitle("");
            setTaskDesc("");
            setAssignedEmp("");
            setSuggestions([]);
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    return (
        <div className="task-wrapper bg-white shadow-md rounded p-5 w-7/12">
            <h2 className="text-3xl text-center font-semibold mb-5">Assign Task</h2>

            {/* Task Title */}
            <div className="input-group mb-4">
                <label className="block mb-2">Enter Task Title</label>
                <input
                    type="text"
                    placeholder="Enter Task Title"
                    className="border w-full p-2"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                />
                {
                    suggestions.length > 0 && (
                        <ul className="mt-2 text-sm text-gray-700">
                            {suggestions.map((s, i) => (
                                <li key={i} className="bg-gray-100 p-1 rounded mb-1">
                                    {s}
                                </li>
                            ))}
                        </ul>
                    )
                }
            </div>

            {/* Task Description */}
            <div className="input-group mb-4">
                <label className="block mb-2">Enter Task Description</label>
                <textarea
                    placeholder="Enter Task Description"
                    className="border w-full p-2"
                    value={taskDesc}
                    onChange={(e) => setTaskDesc(e.target.value)}
                />
            </div>

            {/* Employee Selector */}
            <div className="input-group mb-4">
                <label className="block mb-2">Select Employee</label>
                <select
                    value={assignedEmp}
                    onChange={(e) => setAssignedEmp(e.target.value)}
                    className="border w-full p-2"
                >
                    <option value="">Select Employee</option>
                    {
                        employees.map((emp) => (
                            <option key={emp.empId} value={emp.empName}>
                                {emp.empName}
                            </option>
                        ))
                    }
                </select>
            </div>

            {/* Buttons */}
            <div className="btn-group text-center">
                <button
                    onClick={handleAssignTask}
                    className="w-1/2 bg-indigo-500 text-white py-3"
                >
                    Assign Task
                </button>

                <button
                    onClick={handleTaskSuggestion}
                    className="w-1/3 bg-indigo-500 text-white py-3 ml-2"
                >
                    Generate AI Task Suggestions
                </button>
            </div>
        </div>
    );
};
