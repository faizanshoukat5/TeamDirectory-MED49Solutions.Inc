function EmployeeCard({ employee, index }) {
  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const avatarClass = `avatar avatar-${(index % 5) + 1}`;

  const getRoleIcon = (role) => {
    const roleLower = role.toLowerCase();
    if (roleLower.includes('engineer') || roleLower.includes('developer')) {
      return (
        <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      );
    }
    if (roleLower.includes('design')) {
      return (
        <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="6"></circle>
          <circle cx="12" cy="12" r="2"></circle>
        </svg>
      );
    }
    if (roleLower.includes('manager') || roleLower.includes('product')) {
      return (
        <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      );
    }
    if (roleLower.includes('analyst') || roleLower.includes('data')) {
      return (
        <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3v18h18"></path>
          <path d="m19 9-5 5-4-4-3 3"></path>
        </svg>
      );
    }
    if (roleLower.includes('qa') || roleLower.includes('test')) {
      return (
        <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 11l3 3L22 4"></path>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
        </svg>
      );
    }
    return (
      <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect width="18" height="18" x="3" y="3" rx="2"></rect>
        <path d="M9 17V7"></path>
        <path d="M15 17V7"></path>
      </svg>
    );
  };

  return (
    <div className="employee-card">
      <div className="card-header">
        <div className={avatarClass}>
          {getInitials(employee.FirstName, employee.LastName)}
        </div>
        <div className="card-info">
          <h3>{employee.FirstName} {employee.LastName}</h3>
          <p className="role">{employee.Role}</p>
        </div>
      </div>
      <div className="card-footer">
        <span className="badge">
          {getRoleIcon(employee.Role)}
          {employee.Role}
        </span>
      </div>
    </div>
  );
}

export default EmployeeCard;
