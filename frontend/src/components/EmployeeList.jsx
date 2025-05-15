// import React, { useEffect, useState } from "react";
// import axiosInstance from "../axiosinterceptor";
// import { Button, Table } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import '../css/Employeelist.css'

// const EmployeeList = () => {
//   const [employees, setEmployees] = useState([]);
//   const navigate = useNavigate();
//   const role = localStorage.getItem("role");

//   const fetchEmployees = async () => {
//     try {
//       const endpoint = role === "admin" ? "/admin/allemps" : "/user/viewemps";
//       const response = await axiosInstance.get(endpoint);
//       setEmployees(response.data);
//     } catch (error) {
//       console.error("Error fetching employees", error);
//     }
//   };

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   const handleUpdate = (employee) => {
//     navigate(`/edit/${employee._id}`, { state: { employee } });
//   };

//   const handleDelete = async (empId) => {
//     try {
//       await axiosInstance.delete(`/admin/delete/${empId}`);
//       alert("Employee deleted successfully");
//       fetchEmployees();
//     } catch (error) {
//       console.error("Error deleting employee", error);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Employee List</h2>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Employee Name</th>
//             <th>Employee ID</th>
//             <th>Designation</th>
//             <th>Department</th>
//             <th>Salary</th>
//             {role === "admin" && <th>Actions</th>}
//           </tr>
//         </thead>
//         <tbody>
//           {employees.map((employee) => (
//             <tr key={employee._id}>
//               <td>{employee.empname}</td>
//               <td>{employee.empid}</td>
//               <td>{employee.designation}</td>
//               <td>{employee.department}</td>
//               <td>{employee.salary}</td>
//               {role === "admin" && (
//                 <td>
//                   <Button
//                     variant="success"
//                     onClick={() => handleUpdate(employee)}
//                     className="me-2"
//                   >
//                     Update
//                   </Button>
//                   <Button
//                     variant="danger"
//                     className="me-3"
//                     onClick={() => handleDelete(employee._id)}
//                   >
//                     Delete
//                   </Button>
//                 </td>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default EmployeeList;
import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosinterceptor";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import '../css/Employeelist.css'

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const fetchEmployees = async () => {
    try {
      const endpoint = role === "admin" ? "/admin/allemps" : "/user/viewemps";
      const response = await axiosInstance.get(endpoint);
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleUpdate = (employee) => {
    navigate(`/edit/${employee._id}`, { state: { employee } });
  };

  const handleDelete = async (empId) => {
    try {
      await axiosInstance.delete(`/admin/delete/${empId}`);
      alert("Employee deleted successfully");
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Employee List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Employee ID</th>
            <th>Designation</th>
            <th>Location</th> {/* Changed 'Department' to 'Location' */}
            <th>Salary</th>
            {role === "admin" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td> {/* Display employee name */}
              <td>{employee._id}</td> {/* Use _id as employee ID */}
              <td>{employee.designation}</td> {/* Display employee designation */}
              <td>{employee.location}</td> {/* Display employee location (used as department in your DB) */}
              <td>{employee.salary}</td> {/* Display employee salary */}
              {role === "admin" && (
                <td>
                  <Button
                    variant="success"
                    onClick={() => handleUpdate(employee)}
                    className="me-2"
                  >
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    className="me-3"
                    onClick={() => handleDelete(employee._id)}
                  >
                    Delete
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default EmployeeList;

