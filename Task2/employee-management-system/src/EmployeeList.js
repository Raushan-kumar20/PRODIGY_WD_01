import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/employees')
      .then(response => {
        setEmployees(response.data);
      });
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/employees/${id}`);
    setEmployees(employees.filter(employee => employee._id !== id));
  };

  return (
    <div>
      <h1>Employee List</h1>
      <Link to="/add">Add Employee</Link>
      <ul>
        {employees.map(employee => (
          <li key={employee._id}>
            {employee.name} - {employee.position} - {employee.department} - ${employee.salary}
            <Link to={`/edit/${employee._id}`}>Edit</Link>
            <button onClick={() => handleDelete(employee._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
