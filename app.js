import express from "express";
import {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} from "#db/queries/employees";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Fullstack Employees API.");
});

app.get("/employees", async (req, res, next) => {
  try {
    const employees = await getEmployees();
    res.status(200).json(employees);
  } catch (err) {
    next(err);
  }
});

app.post("/employees", async (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send("Request body is required");
    }
    
    const { name, birthday, salary } = req.body;
    if (!name || !birthday || !salary) {
      return res.status(400).send("Missing required fields");
    }

    const newEmployee = await createEmployee({ name, birthday, salary });
    res.status(201).json(newEmployee);
  } catch (err) {
    next(err);
  }
});

app.get("/employees/:id", async (req, res, next) => {
  try {
    const employee = await getEmployee(req.params.id);
    if (!employee) {
      return res.status(404).send("Employee not found");
    }
    res.status(200).json(employee);
  } catch (err) {
    next(err);
  }
});

app.put("/employees/:id", async (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send("Request body is required");
    }
    
    const { name, birthday, salary } = req.body;
    if (!name || !birthday || !salary) {
      return res.status(400).send("Missing required fields");
    }

    const id = req.params.id;
    const existingEmployee = await getEmployee(id);
    if (!existingEmployee) {
      return res.status(404).send("Employee not found");
    }

    const updatedEmployee = await updateEmployee({ id, name, birthday, salary });
    res.status(200).json(updatedEmployee);
  } catch (err) {
    next(err);
  }
});

app.delete("/employees/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const existingEmployee = await getEmployee(id);
    if (!existingEmployee) {
      return res.status(404).send("Employee not found");
    }

    await deleteEmployee(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

export default app;