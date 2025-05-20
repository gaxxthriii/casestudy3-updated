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



import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosinterceptor";
import { Button, Table, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../css/Employeelist.css";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const fetchEmployees = async () => {
    try {
      const endpoint = role === "admin" ? "/admin/allemps" : "/user/viewemps";
      const response = await axiosInstance.get(endpoint);
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees", error);
    } finally {
      setLoading(false);
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
      <Card className="shadow-lg border-0 rounded-4">
        <Card.Header className="bg-primary text-white text-center py-3 rounded-top-4">
          <h4 className="mb-0">Employee Directory</h4>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <Table responsive bordered hover className="text-center align-middle">
              <thead className="table-primary">
                <tr>
                  <th>Name</th>
                  <th>ID</th>
                  <th>Designation</th>
                  <th>Location</th>
                  <th>Salary</th>
                  {role === "admin" && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {employees.length > 0 ? (
                  employees.map((employee) => (
                    <tr key={employee._id}>
                      <td>{employee.name}</td>
                      <td>{employee._id}</td>
                      <td>{employee.designation}</td>
                      <td>{employee.location}</td>
                      <td>{employee.salary}</td>
                      {role === "admin" && (
                        <td>
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => handleUpdate(employee)}
                            className="me-2"
                          >
                            Update
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDelete(employee._id)}
                          >
                            Delete
                          </Button>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={role === "admin" ? 6 : 5} className="text-muted">
                      No employees found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </Card.Body>
        <Card.Footer className="text-muted text-center small rounded-bottom-4">
          © 2025 Employee Management System
        </Card.Footer>
      </Card>
    </div>
  );
};

export default EmployeeList;
