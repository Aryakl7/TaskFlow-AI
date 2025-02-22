import axios from "axios";
import { useState } from "react"

export const TaskManagement = ({employees}) => {

    const [taskTitle, setTaskTitle] = useState("");
    const [taskDesc, setTaskDesc] = useState("");
    const [assignedEmp, setAssignedEmp] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [predictingTime, setPredictingTime] = useState(null);

    // Auto-completion suggestions API
    const handleTaskSuggestion = async (e) => {
        // setTaskTitle(e.target.value);
        if(taskTitle.length > 3) {
            try {   
                const response = await axios.post("http://localhost:5500/api/task/suggest", {input: taskTitle});
                setSuggestions(response.data.suggestions.split("\n"));
                console.log("Suggestions :",suggestions);
            } catch (error) {
                console.log("Error while fetching suggestions :",error);
            }
        }
    }

    const handleAssignTask = async (e) => {
        try {
            const res = await axios.post("http://localhost:5500/api/task/createTask", {taskTitle, taskDesc, assignedEmp});
            setTaskTitle("");
            setTaskDesc("");
            setAssignedEmp("");
            setSuggestions([])
        } catch (error) {
            console.error("Error creating task :",error);
        }
    }

    return (
        <div className="task-wrapper bg-white shadow-md rounded p-5 w-7/12">
            <h2 className="text-3xl text-center font-semibold mb-5">Assign Task</h2>

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
                        <ul>
                            {
                                suggestions.map((s, i) => (
                                    <li key={i}>
                                        {s}
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }

            </div>

            <div className="input-group mb-4">
                <label className="block mb-2">Enter Task Description</label>
                <textarea
                    placeholder="Enter Task Description"
                    className="border w-full p-2"
                    value={taskDesc}
                    onChange={(e) => setTaskDesc(e.target.value)}
                />
            </div>

            <div className="input-group mb-4">
                <label className="block mb-2">Select Emp</label>
                <select 
                onChange={(e) => setAssignedEmp(e.target.value)}
                className="border w-full p-2">
                    <option>Select Employee</option>
                    {
                        employees.map((emp) => (
                            <option key={emp.empId} value={emp.empName}>
                                {emp.empName}
                            </option>
                        ))
                    }
                </select>
            </div>

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
    )
}