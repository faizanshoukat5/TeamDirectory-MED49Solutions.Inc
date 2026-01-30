import { useState } from "react";

function EmployeeForm({ onCreated, createUrl }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!firstName.trim() || !lastName.trim() || !role.trim()) {
      setError("All fields are required.");
      return;
    }
    setSuccess("");

    setLoading(true);

    try {
      // Submit as form-encoded data to avoid CORS preflight (application/x-www-form-urlencoded)
      const params = new URLSearchParams();
      params.append('FirstName', firstName.trim());
      params.append('LastName', lastName.trim());
      params.append('Role', role.trim());

      const res = await fetch(createUrl, {
        method: "POST",
        body: params
      });

      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const payload = await res.json();
      if (!payload.success) throw new Error(payload.error || "API error");

      // success
      setFirstName("");
      setLastName("");
      setRole("");
      setSuccess('Created successfully');

      if (onCreated) onCreated(payload.data);
    } catch (err) {
      setError(err.message || "Unable to create employee.");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(''), 2000);
    }
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <h3>Add Team Member</h3>
      {error && <div className="form-error">{error}</div>}
      {success && <div className="form-success">{success}</div>}
      <label>
        First name
        <input autoFocus placeholder="e.g. John" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </label>
      <label>
        Last name
        <input placeholder="e.g. Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </label>
      <label>
        Role
        <input placeholder="e.g. Backend Engineer" value={role} onChange={(e) => setRole(e.target.value)} />
      </label>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? "Saving…" : "Create"}</button>
      </div>
    </form>
  );
}

export default EmployeeForm;
