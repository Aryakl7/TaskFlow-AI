import { EmployeeManagement } from "./components/EmployeeManagement";
import Header from "./components/Header";
import { TaskManagement } from "./components/TaskManagement";

function App() {
  return (
    <div id="container" className="bg-gray-100 h-screen">
      <Header/>
      <div className="w-10/12 m-auto flex justify-between">
        <EmployeeManagement/>
        <TaskManagement/>
      </div>
    </div>
  )
}

export default App;