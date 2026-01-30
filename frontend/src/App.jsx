import { useEffect, useMemo, useState } from "react";
import EmployeeCard from "./components/EmployeeCard.jsx";
import EmployeeTable from "./components/EmployeeTable.jsx";
import EmployeeForm from "./components/EmployeeForm.jsx";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8500/backend/api/TeamService.cfc?method=getEmployees&returnformat=json";
const CREATE_URL = "http://localhost:8500/backend/api/TeamService.cfc?method=createEmployee&returnformat=json"; // direct CFC POST endpoint
const ITEMS_PER_PAGE = 9;

function App() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [viewMode, setViewMode] = useState("cards"); // "cards" or "table"

  const loadEmployees = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL, { method: "GET" });

      if (!response.ok) throw new Error(`Request failed with status ${response.status}`);

      const payload = await response.json();
      if (!payload.success) throw new Error("API returned an error.");

      setEmployees(payload.data || []);
    } catch (err) {
      setError(err.message || "Unable to load employees.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const [showForm, setShowForm] = useState(false);

  // Reset visible count when search changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [search]);

  const filteredEmployees = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) {
      return employees;
    }

    return employees.filter((employee) =>
      `${employee.FirstName} ${employee.LastName}`.toLowerCase().includes(term)
    );
  }, [employees, search]);

  const visibleEmployees = useMemo(() => {
    return filteredEmployees.slice(0, visibleCount);
  }, [filteredEmployees, visibleCount]);

  const hasMore = visibleCount < filteredEmployees.length;
  const remainingCount = filteredEmployees.length - visibleCount;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const handleShowAll = () => {
    setVisibleCount(filteredEmployees.length);
  };

  const [toast, setToast] = useState('');

  // auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  // helper to set toast and optionally refresh list
  const showToast = (message) => {
    setToast(message);
  };

  return (
    <div className="page">
      <header className="header">
        <div className="header-content">
          <div className="header-text">
            <h1>Team Directory</h1>
            <p>Meet our amazing team members and discover their roles</p>
          </div>

          {showForm && (
            <div className="form-overlay" role="dialog" aria-modal="true">
              <div className="form-panel">
                <button className="form-close" onClick={() => setShowForm(false)} aria-label="Close">×</button>
                <EmployeeForm onCreated={async () => { setShowForm(false); await loadEmployees(); showToast('Employee created successfully'); }} createUrl={CREATE_URL} />
              </div>
            </div>
          )}
          <div className="search">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            <input
              type="text"
              placeholder="Search team members..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <div className="header-actions">
            <button className="btn btn-primary btn-sm" onClick={() => setShowForm(true)} title="Add Employee">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14"></path>
                <path d="M5 12h14"></path>
              </svg>
              <span className="btn-label">Add Employee</span>
            </button>
          </div>
        </div>
        <div className="author-badge">
          Made by <span className="author-name">Faizan Shaukat</span>
        </div>
      </header>

      {loading && (
        <div className="state state-loading">
          <svg className="state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
          </svg>
          <h3>Loading team members...</h3>
          <p>Please wait while we fetch the directory</p>
        </div>
      )}

      {error && (
        <div className="state state-error">
          <svg className="state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="m15 9-6 6"></path>
            <path d="m9 9 6 6"></path>
          </svg>
          <h3>Something went wrong</h3>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="stats-bar">
            <div className="stats-count">
              Showing <span>{visibleEmployees.length}</span> of <span>{filteredEmployees.length}</span> team members
            </div>
            <div className="view-toggle">
              <button 
                className={`toggle-btn ${viewMode === "cards" ? "active" : ""}`}
                onClick={() => setViewMode("cards")}
                title="Card View"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </button>
              <button 
                className={`toggle-btn ${viewMode === "table" ? "active" : ""}`}
                onClick={() => setViewMode("table")}
                title="Table View"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3h18v18H3z"></path>
                  <path d="M3 9h18"></path>
                  <path d="M3 15h18"></path>
                  <path d="M9 3v18"></path>
                </svg>
              </button>
            </div>
          </div>
          {filteredEmployees.length === 0 ? (
            <div className="state state-empty">
              <svg className="state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
                <path d="M8 11h6"></path>
              </svg>
              <h3>No results found</h3>
              <p>Try adjusting your search term</p>
            </div>
          ) : (
            <>
              {viewMode === "cards" ? (
                <div className="employee-grid">
                  {visibleEmployees.map((employee, index) => (
                    <EmployeeCard key={employee.ID} employee={employee} index={index} />
                  ))}
                </div>
              ) : (
                <EmployeeTable employees={visibleEmployees} />
              )}
              
              {hasMore && (
                <div className="load-more-container">
                  <button className="btn btn-primary" onClick={handleLoadMore}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14"></path>
                      <path d="M5 12h14"></path>
                    </svg>
                    Load More ({remainingCount} remaining)
                  </button>
                  <button className="btn btn-secondary" onClick={handleShowAll}>
                    View All {filteredEmployees.length} Members
                  </button>
                </div>
              )}

              {/* Floating Add button */}
              <button className="fab" aria-label="Add employee" onClick={() => setShowForm(true)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14"></path>
                  <path d="M5 12h14"></path>
                </svg>
              </button>
            </>
          )}
        </>
      )}
      {toast && (
        <div className="toast" role="status" aria-live="polite">{toast}</div>
      )}
    </div>
  );
}

export default App;
