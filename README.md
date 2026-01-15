# Team Directory

**Made by Faizan Shaukat**

A full-stack take-home project demonstrating a ColdFusion REST API connected to a modern React (Vite) front-end. The application retrieves employee data from a SQL Server database and displays it in a clean, searchable interface.

---

## 📁 Project Structure

```
MED49/
├── README.md                          # This file
├── DEMO_SCRIPT.md                     # 2-minute video script outline
├── backend/
│   ├── Application.cfc                # ColdFusion app config + CORS handling
│   ├── api/
│   │   └── TeamService.cfc            # REST endpoint (GET /employees)
│   └── database/
│       └── schema.sql                 # SQL script to create table + seed data
└── frontend/
    ├── package.json                   # Node dependencies
    ├── vite.config.js                 # Vite configuration
    ├── index.html                     # HTML entry point
    ├── .env.example                   # Environment variable template
    └── src/
        ├── main.jsx                   # React entry point
        ├── App.jsx                    # Main component (fetch, state, search, pagination)
        ├── styles.css                 # Application styles
        └── components/
            ├── EmployeeCard.jsx       # Card component with avatar and role
            └── EmployeeTable.jsx      # Table component (alternative view)
```

---

## 🛠️ Prerequisites

Before starting, ensure you have the following installed:

- **ColdFusion 2021/2023/2025** (with built-in web server on port 8500)
- **SQL Server Express** (or SQL Server with mixed authentication enabled)
- **Node.js 18+** and **npm**

---

## 🗄️ Step 1: Database Setup

### 1.1 Install SQL Server Express (if not installed)

```powershell
# Using winget (Windows Package Manager)
winget install --id Microsoft.SQLServer.2019.Express -e
```

### 1.2 Enable Mixed Authentication Mode

SQL Server Express installs with Windows Authentication only. Enable SQL Authentication:

```powershell
# Run in PowerShell (requires sqlcmd in PATH)
sqlcmd -S localhost\SQLEXPRESS -E -Q "EXEC xp_instance_regwrite N'HKEY_LOCAL_MACHINE', N'Software\Microsoft\MSSQLServer\MSSQLServer', N'LoginMode', REG_DWORD, 2"

# Restart SQL Server
Restart-Service -Name 'MSSQL$SQLEXPRESS' -Force
```

### 1.3 Create the Database and Table

```powershell
# Create database
sqlcmd -S localhost\SQLEXPRESS -E -Q "CREATE DATABASE team_directory"

# Run the schema script to create table and seed data
sqlcmd -S localhost\SQLEXPRESS -E -d team_directory -i "backend/database/schema.sql"
```

### 1.4 Create a SQL Login for ColdFusion

```powershell
sqlcmd -S localhost\SQLEXPRESS -E -Q "CREATE LOGIN admin WITH PASSWORD = 'Admin123!'; USE team_directory; CREATE USER admin FOR LOGIN admin; ALTER ROLE db_datareader ADD MEMBER admin;"
```

### 1.5 Start SQL Server Browser Service

The Browser service is required for named instance connections:

1. Open **Services** (`services.msc`)
2. Find **SQL Server Browser**
3. Set **Startup type** to **Automatic**
4. Click **Start**

---

## ⚙️ Step 2: ColdFusion Backend Setup

### 2.1 Create Data Source in ColdFusion Administrator

1. Open ColdFusion Administrator: http://localhost:8500/CFIDE/administrator/
2. Navigate to **Data & Services** → **Data Sources**
3. Click **Add New Data Source**:
   - **CF Data Source Name:** `team_directory`
   - **Driver:** Microsoft SQL Server
4. Configure connection:
   - **Server:** `localhost\SQLEXPRESS`
   - **Port:** *(leave blank)*
   - **Database:** `team_directory`
   - **User name:** `admin`
   - **Password:** `Admin123!`
5. Click **Submit** and **Verify Connection**

### 2.2 Deploy Backend Files

Copy the `backend` folder to the ColdFusion web root:

```powershell
Copy-Item -Path "backend" -Destination "C:\ColdFusion2025\cfusion\wwwroot\" -Recurse -Force
```

> **Note:** Adjust the path if your ColdFusion installation differs (e.g., `C:\ColdFusion2023\cfusion\wwwroot\`).

### 2.3 Verify API Endpoint

Test the API in your browser or terminal:

```powershell
curl "http://localhost:8500/backend/api/TeamService.cfc?method=getEmployees&returnformat=json"
```

Expected response:
```json
{
  "success": true,
  "data": [
    {"ID": 1, "FirstName": "Ava", "LastName": "Nguyen", "Role": "Product Manager"},
    {"ID": 2, "FirstName": "Liam", "LastName": "Patel", "Role": "Senior Engineer"},
    ...
  ]
}
```

---

## 🖥️ Step 3: React Frontend Setup

### 3.1 Install Dependencies

```powershell
cd frontend
npm install
```

### 3.2 Configure Environment

Copy the example environment file and adjust if needed:

```powershell
Copy-Item .env.example .env
```

The `.env` file contains:
```
VITE_API_URL=http://localhost:8500/backend/api/TeamService.cfc?method=getEmployees&returnformat=json
```

### 3.3 Start Development Server

```powershell
npm run dev
```

The app will start at http://localhost:5173 (or next available port).

---

## 🚀 Running the Complete Application

1. **Ensure SQL Server is running:**
   ```powershell
   Get-Service -Name 'MSSQL$SQLEXPRESS'
   ```

2. **Ensure ColdFusion is running:**
   ```powershell
   Get-Service -Name 'ColdFusion 2025 Application Server'
   ```

3. **Start the React frontend:**
   ```powershell
   cd frontend
   npm run dev
   ```

4. **Open the application:** http://localhost:5173

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Employee Cards** | Modern card-based layout with avatars and role icons |
| **Search** | Real-time filtering by first name, last name, or role |
| **Pagination** | "Load More" and "View All" buttons for browsing 50+ employees |
| **Loading State** | Shows loading indicator while fetching data |
| **Error Handling** | Displays user-friendly error messages |
| **JSON API** | REST endpoint returns database records in JSON format |
| **CORS Support** | Configured for cross-origin requests |
| **Secure Queries** | Uses `<cfqueryparam>` to prevent SQL injection |

---

## 🔧 Troubleshooting

### CORS Errors
- Ensure `Application.cfc` is in the backend folder and sets CORS headers
- Restart ColdFusion after deploying backend files

### Database Connection Failed
- Verify SQL Server Browser service is running
- Confirm mixed authentication is enabled
- Check credentials in ColdFusion Administrator

### "No employees found"
- Verify the API returns data: test the endpoint directly in browser
- Check browser console for fetch errors

---

## 📹 Demo Video Script

See [DEMO_SCRIPT.md](DEMO_SCRIPT.md) for a 2-minute video outline covering:
- Project overview
- Backend structure and API
- Frontend components
- Search feature demonstration

---

## 🧰 Tech Stack

- **Backend:** ColdFusion 2025, SQL Server Express
- **Frontend:** React 18, Vite 5
- **Styling:** Custom CSS (no frameworks)

---

## 📄 License

This project was created as a take-home technical assessment.
