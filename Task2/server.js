const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb://localhost/employee-management', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());

const employeeSchema = new mongoose.Schema({
  name: String,
  position: String,
  department: String,
  salary: Number,
});

const Employee = mongoose.model('Employee', employeeSchema);

// CRUD Routes
app.post('/api/employees', async (req, res) => {
  const employee = new Employee(req.body);
  await employee.save();
  res.status(201).send(employee);
});

app.get('/api/employees', async (req, res) => {
  const employees = await Employee.find();
  res.send(employees);
});

app.get('/api/employees/:id', async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  res.send(employee);
});

app.put('/api/employees/:id', async (req, res) => {
  const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(employee);
});

app.delete('/api/employees/:id', async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
