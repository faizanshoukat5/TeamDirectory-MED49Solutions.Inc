function EmployeeTable({ employees }) {
  if (!employees.length) {
    return <div className="state">No employees found.</div>;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.ID}>
              <td>{employee.FirstName} {employee.LastName}</td>
              <td>{employee.Role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;
