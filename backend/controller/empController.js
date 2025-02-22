const Emp = require("../model/Emp");

// Create Emp
exports.createEmp = async (req, res) => {
    try {
        console.log("Adding new employee");
        const { empId, empName, empSkills } = req.body;
        const emp = new Emp({ empId, empName, empSkills });
        console.log("New emp : ",emp);
        await emp.save();
        res.json(emp);
    } catch (error) {
        console.log("Error while saving emp",error);
        res.status(500).json({"error" : "Internal server error"});
    }
}

// Get Emp
exports.getAllEmp = async (req, res) => {
    try {
        const emp = await Emp.find();
        res.json(emp);
    } catch (error) {
        console.log("Error while saving emp",error);
        res.status(500).json({"error" : "Internal server error"});
    }
}