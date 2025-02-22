import { useEffect, useState } from "react";
import { EmployeeManagement } from "./components/EmployeeManagement";
import Header from "./components/Header";
import { TaskManagement } from "./components/TaskManagement";
import { TaskBoard } from "./components/EmployeeTabs";

function App() {

  const [employees, setEmployees] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [error, setError] = useState("");
  
  useEffect(() => {
    fetch("http://localhost:5500/api/emp/empList")
    .then((response) => {
      if(!response.ok) throw new Error ("Failed to fetch employees...")
        return response.json();
    })
    .then((data) => {
      setEmployees(data);
      // console.log("Emp data :",data);
    })
    .catch((error) => {
      setError(error.message);
    })
  }, []);

  useEffect(() => {
    fetch("http://localhost:5500/api/task/getTaskList")
    .then((response) => {
      if(!response.ok) throw new Error ("Failed to fetch employees...")
        return response.json();
    })
    .then((data) => {
      setTaskList(data);
      // console.log("Emp data :",data);
    })
    .catch((error) => {
      setError(error.message);
    })
  }, []);

  return (
    <div id="container" className="bg-gray-100">
      <Header/>
      <div className="w-10/12 m-auto">
        
        <main className="flex justify-between">
          <EmployeeManagement/>
          <TaskManagement employees={employees}/>
        </main>

        <TaskBoard employees={employees} taskList={taskList}/>
      </div>
    </div>
  )
}

export default App;