import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EmployeeForm = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');
  const [salary, setSalary] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/employees/${id}`)
        .then(response => {
          const { name, position, department, salary } = response.data;
          setName(name);
          setPosition(position);
          setDepartment(department);
          setSalary(salary);
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const employee = { name, position, department, salary };
    if (id) {
      await axios.put(`http://localhost:5000/api/employees/${id}`, employee);
    } else {
      await axios.post('http://localhost:5000/api/employees', employee);
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} placeholder="Position" required />
      <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Department" required />
      <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="Salary" required />
      <button type="submit">{id ? 'Update' : 'Add'} Employee</button>
    </form>
  );
};

export default EmployeeForm;
