
import { useState } from 'react';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Arun Kumar', role: 'Software Developer', department: 'IT', salary: 45000 },
    { id: 2, name: 'Priya Sharma', role: 'HR Manager', department: 'HR', salary: 40000 },
    { id: 3, name: 'Rahul Kumar', role: 'Data Analyst', department: 'Analytics', salary: 42000 },
    { id: 4, name: 'Sneha Devi', role: 'UI/UX Designer', department: 'Design', salary: 38000 }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    role: '',
    department: '',
    salary: ''
  });

  function handleAddEmployee(e) {
    e.preventDefault();

    setEmployees([
      ...employees,
      {
        id: Date.now(),
        name: newEmployee.name,
        role: newEmployee.role,
        department: newEmployee.department,
        salary: Number(newEmployee.salary)
      }
    ]);

    setNewEmployee({
      name: '',
      role: '',
      department: '',
      salary: ''
    });

    setShowForm(false);
  }

  function deleteEmployee(id) {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this employee?'
    );

    if (confirmDelete) {
      setEmployees(employees.filter(employee => employee.id !== id));
    }
  }

  const filteredEmployees = employees.filter(employee =>
    `${employee.name} ${employee.role} ${employee.department}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalSalary = employees.reduce(
    (total, employee) => total + employee.salary,
    0
  );

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>EMS<span>.</span></h2>
        <p className="menu-title">MAIN MENU</p>
        <div className="menu active">▦ &nbsp; Dashboard</div>
        <div className="menu">♙ &nbsp; Employees</div>
        <div className="menu">▤ &nbsp; Departments</div>
        <div className="menu">⚙ &nbsp; Settings</div>
        <p className="sidebar-bottom">Employee Management System</p>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back! Here's your organization overview.</p>
          </div>

          <div className="profile">
            <div className="avatar">A</div>
            <div>
              <strong>Admin</strong>
              <small>Administrator</small>
            </div>
          </div>
        </header>

        <section className="stats">
          <div className="stat-card">
            <span>Total Employees</span>
            <h2>{employees.length}</h2>
            <p>Employees in the system</p>
          </div>

          <div className="stat-card">
            <span>Departments</span>
            <h2>{new Set(employees.map(e => e.department)).size}</h2>
            <p>Across the organization</p>
          </div>

          <div className="stat-card">
            <span>Monthly Payroll</span>
            <h2>₹{totalSalary.toLocaleString('en-IN')}</h2>
            <p>Combined monthly salary</p>
          </div>

          <div className="stat-card">
            <span>Active Employees</span>
            <h2>{employees.length}</h2>
            <p>Currently listed employees</p>
          </div>
        </section>

        <section className="employee-section">
          <div className="section-heading">
            <div>
              <h2>Employee Directory</h2>
              <p>Manage and view your team members.</p>
            </div>

            <button onClick={() => setShowForm(!showForm)}>
              {showForm ? 'Close Form' : '+ Add Employee'}
            </button>
          </div>

          {showForm && (
            <form className="employee-form" onSubmit={handleAddEmployee}>
              <input
                type="text"
                placeholder="Employee Name"
                value={newEmployee.name}
                onChange={e =>
                  setNewEmployee({ ...newEmployee, name: e.target.value })
                }
                required
              />

              <input
                type="text"
                placeholder="Job Role"
                value={newEmployee.role}
                onChange={e =>
                  setNewEmployee({ ...newEmployee, role: e.target.value })
                }
                required
              />

              <input
                type="text"
                placeholder="Department"
                value={newEmployee.department}
                onChange={e =>
                  setNewEmployee({ ...newEmployee, department: e.target.value })
                }
                required
              />

              <input
                type="number"
                placeholder="Monthly Salary"
                min="1"
                value={newEmployee.salary}
                onChange={e =>
                  setNewEmployee({ ...newEmployee, salary: e.target.value })
                }
                required
              />

              <button type="submit">Save Employee</button>
            </form>
          )}

          <input
            className="search-box"
            type="text"
            placeholder="Search by name, role or department..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>EMPLOYEE</th>
                  <th>ROLE</th>
                  <th>DEPARTMENT</th>
                  <th>MONTHLY SALARY</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {filteredEmployees.map(employee => (
                  <tr key={employee.id}>
                    <td>
                      <div className="employee-name">
                        <div className="avatar">
                          {employee.name.charAt(0).toUpperCase()}
                        </div>
                        <strong>{employee.name}</strong>
                      </div>
                    </td>
                    <td>{employee.role}</td>
                    <td>{employee.department}</td>
                    <td>₹{employee.salary.toLocaleString('en-IN')}</td>
                    <td><span className="status">Active</span></td>
                    <td>
                      <button
                        className="delete-button"
                        onClick={() => deleteEmployee(employee.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredEmployees.length === 0 && (
                  <tr>
                    <td colSpan="6">No employees found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <footer>© 2026 Employee Management System</footer>
      </main>
    </div>
  );
}

export default App;
