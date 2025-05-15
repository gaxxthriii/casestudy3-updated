import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../axiosinterceptor';
import { useEffect, useState } from 'react';
import '../css/AddEmp.css';

const AddEmployee = () => {
  const [form, setForm] = useState({
    name: '',         
    empid: '',
    designation: '',
    salary: '',
    location: '',     
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.employee) {
      const emp = location.state.employee;
      setForm({
        name: emp.name || '',    // Changed empname to name
        empid: emp.empid || '',
        designation: emp.designation || '',
        salary: emp.salary || '',
        location: emp.location || '',
      });
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.empid) { // Changed empname to name
      setError('Employee name and ID are required.');
      return;
    }

    try {
      const token = localStorage.getItem('token');

      if (location.state?.employee) {
        // Edit mode
        await axiosInstance.put(`http://localhost:3000/admin/edit/${location.state.employee._id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Employee updated successfully!');
      } else {
        // Add mode
        await axiosInstance.post('http://localhost:3000/admin/addemp', form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Employee added successfully!');
      }

      navigate('/employees');
    } catch (err) {
      setError('Failed to submit. Please try again.');
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-success text-white text-center">
              <h4>{location.state?.employee ? 'Edit Employee' : 'Add New Employee'}</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="mb-3">
                  <label className="form-label">Employee Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.name}    
                    onChange={(e) => setForm({ ...form, name: e.target.value })}  
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Employee ID</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.empid}
                    onChange={(e) => setForm({ ...form, empid: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Designation</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.designation}
                    onChange={(e) => setForm({ ...form, designation: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Salary</label>
                  <input
                    type="number"
                    className="form-control"
                    value={form.salary}
                    onChange={(e) => setForm({ ...form, salary: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                  />
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-success">
                    {location.state?.employee ? 'Update Employee' : 'Add Employee'}
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer text-muted text-center">
              Employee Management System
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
