export const EmployeeManagement = () => {
    return (
        <div className="emp-wrapper bg-white shadow-md rounded p-5 w-1/3">
            <h2 className="text-3xl text-center font-semibold mb-5">Add Employee</h2>

            <div className="input-group mb-4">
                <label className="block mb-2">Enter Emp ID</label>
                <input
                    type="text"
                    placeholder="Enter Emp id"
                    className="border w-full p-2"
                />
            </div>

            <div className="input-group mb-4">
                <label className="block mb-2">Enter Emp Name</label>
                <input
                    type="text"
                    placeholder="Enter Emp Name"
                    className="border w-full p-2"
                />
            </div>

            <div className="input-group mb-4">
                <label className="block mb-2">Enter Emp Skills</label>
                <input
                    type="text"
                    placeholder="Enter Emp Skills"
                    className="border w-full p-2"
                />
            </div>

            <div className="btn-group text-center">
                <button 
                    className="w-1/2 bg-indigo-500 text-white py-3"
                >
                    Add New Emp
                </button>
            </div>
        </div>
    )
}