import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../axiosinterceptor';
import { useEffect, useState } from 'react';

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
        name: emp.name || '',
        empid: emp.empid || '',
        designation: emp.designation || '',
        salary: emp.salary || '',
        location: emp.location || '',
      });
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.empid) {
      setError('Employee name and ID are required.');
      return;
    }

    try {
      const token = localStorage.getItem('token');

      if (location.state?.employee) {
        await axiosInstance.put(
          `http://localhost:3000/admin/edit/${location.state.employee._id}`,
          form,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        alert('Employee updated successfully!');
      } else {
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
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '1rem', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        {location.state?.employee ? 'Edit Employee' : 'Add New Employee'}
      </h2>

      {error && (
        <div
          style={{
            backgroundColor: '#f8d7da',
            color: '#721c24',
            padding: '10px',
            marginBottom: '1rem',
            borderRadius: '4px',
            border: '1px solid #f5c6cb',
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label htmlFor="name" style={{ display: 'block', marginBottom: '0.25rem' }}>
          Employee Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={{
            width: '100%',
            padding: '8px',
            marginBottom: '1rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />

        <label htmlFor="empid" style={{ display: 'block', marginBottom: '0.25rem' }}>
          Employee ID:
        </label>
        <input
          type="text"
          id="empid"
          name="empid"
          value={form.empid}
          onChange={(e) => setForm({ ...form, empid: e.target.value })}
          style={{
            width: '100%',
            padding: '8px',
            marginBottom: '1rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />

        <label htmlFor="designation" style={{ display: 'block', marginBottom: '0.25rem' }}>
          Designation:
        </label>
        <input
          type="text"
          id="designation"
          name="designation"
          value={form.designation}
          onChange={(e) => setForm({ ...form, designation: e.target.value })}
          style={{
            width: '100%',
            padding: '8px',
            marginBottom: '1rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />

        <label htmlFor="salary" style={{ display: 'block', marginBottom: '0.25rem' }}>
          Salary:
        </label>
        <input
          type="number"
          id="salary"
          name="salary"
          value={form.salary}
          onChange={(e) => setForm({ ...form, salary: e.target.value })}
          style={{
            width: '100%',
            padding: '8px',
            marginBottom: '1rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />

        <label htmlFor="location" style={{ display: 'block', marginBottom: '0.25rem' }}>
          Location:
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          style={{
            width: '100%',
            padding: '8px',
            marginBottom: '1.5rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#28a745',
            color: 'white',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {location.state?.employee ? 'Update Employee' : 'Add Employee'}
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
