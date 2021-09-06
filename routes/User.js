const router = require("express").Router();
const mongoose = require("mongoose");

// import employee model
const EmployeeModel = require("../models/employee");
const RoleModel = require("../models/role");

// fetch all users data from database
router.get("/", async (req, res) => {
  try {
    const employeeData = await EmployeeModel.find().lean();

    const totalRoles = await RoleModel.find();

    const tempData = employeeData.map((list) => {
      return {
        ...list,
        roleName: totalRoles.filter((d) => d._id == list.roleId)[0].title,
      };
    });

    res.json(tempData);
  } catch (err) {
    console.log(err);
    res.json({ err: "Something Want Wrong" });
  }
});

// fetch one user data from id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const employeeData = await EmployeeModel.find({
      _id: id,
    }).lean();

    const totalRoles = await RoleModel.find();

    const userRole = totalRoles.filter(
      (d) => d._id == employeeData[0].roleId
    )[0].title;

    if (userRole == "manager") {
      const list = employeeData[0];
      const fetchAllEmployeeData = await EmployeeModel.find({
        managerId: list._id,
      }).lean();

      const data = {
        ...list,
        roleName: userRole,
        employeeList: fetchAllEmployeeData.filter(
          (d) => d._id.toString() != list._id.toString()
        ),
      };
      res.json(data);
    } else {
      const data = {
        ...employeeData[0],
        roleName: userRole,
      };
      res.json(data);
    }
  } catch (err) {
    console.log(err);
    res.json({ err: "Something Want Wrong" });
  }
});

// add new user in database
router.post("/add/employee", async (req, res) => {
  try {
    var { userRole, managerId, firstName, lastName } = req.body;

    const totalRoles = await RoleModel.find();

    const addRecord = new EmployeeModel({
      firstName,
      lastName,
      roleId: "000",
      managerId: "000",
    });

    if (userRole == "manager") {
      addRecord.managerId = addRecord._id;
      addRecord.roleId = totalRoles
        .filter((stack) => stack.title == "manager")[0]
        ._id.toString();
    } else if (userRole == "employee") {
      addRecord.managerId = managerId;
      addRecord.roleId = totalRoles
        .filter((stack) => stack.title == "employee")[0]
        ._id.toString();
    }

    await addRecord.save();

    res.json({ msg: "Record Added Successfully" });
  } catch (err) {
    console.log(err);
    res.json({ err: "Something Want Wrong" });
  }
});

// add new role
router.post("/add/role", async (req, res) => {
  try {
    const { roleTitle } = req.body;

    const addRecord = new RoleModel({
      title: roleTitle,
      departmentId: 1,
    });

    await addRecord.save();

    res.json({ msg: "Record Added Successfully" });
  } catch (err) {
    console.log(err);
    res.json({ err: "Something Want Wrong" });
  }
});

module.exports = router;
