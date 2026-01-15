-- Team Directory schema + seed data
-- Drop table if exists for clean setup
IF OBJECT_ID('Employees', 'U') IS NOT NULL DROP TABLE Employees;

CREATE TABLE Employees (
    ID INT PRIMARY KEY IDENTITY(1,1),
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,
    Role VARCHAR(150) NOT NULL
);

INSERT INTO Employees (FirstName, LastName, Role) VALUES
-- Original team members
('Ava', 'Nguyen', 'Product Manager'),
('Liam', 'Patel', 'Senior Engineer'),
('Mia', 'Johnson', 'UX Designer'),
('Noah', 'Garcia', 'QA Analyst'),
('Emma', 'Williams', 'Data Analyst'),
-- Pakistani names
('Faizan', 'Ahmed', 'Full Stack Developer'),
('Ayesha', 'Khan', 'Frontend Developer'),
('Ali', 'Raza', 'Backend Engineer'),
('Fatima', 'Malik', 'UI/UX Designer'),
('Hassan', 'Shah', 'DevOps Engineer'),
('Zainab', 'Hussain', 'Data Scientist'),
('Bilal', 'Iqbal', 'Software Engineer'),
('Sana', 'Tariq', 'Product Manager'),
('Usman', 'Farooq', 'Mobile Developer'),
('Hira', 'Nawaz', 'QA Engineer'),
('Ahmed', 'Siddiqui', 'Team Lead'),
('Mariam', 'Rashid', 'Business Analyst'),
('Hamza', 'Qureshi', 'Cloud Architect'),
('Amina', 'Javed', 'Technical Writer'),
('Omar', 'Chaudhry', 'Security Engineer'),
('Noor', 'Butt', 'Scrum Master'),
('Saad', 'Aslam', 'Database Administrator'),
('Khadija', 'Riaz', 'HR Manager'),
('Imran', 'Yousaf', 'Project Manager'),
('Rabia', 'Akram', 'Marketing Specialist'),
('Junaid', 'Mirza', 'Solutions Architect'),
('Mahnoor', 'Saleem', 'Content Strategist'),
('Waqas', 'Bhatti', 'Network Engineer'),
('Sidra', 'Anwar', 'Research Analyst'),
('Kashif', 'Mahmood', 'Senior Developer'),
-- International diversity
('Sarah', 'Thompson', 'Operations Manager'),
('James', 'Anderson', 'Chief Technology Officer'),
('Priya', 'Sharma', 'Machine Learning Engineer'),
('Chen', 'Wei', 'Systems Analyst'),
('Sofia', 'Martinez', 'Customer Success Manager'),
('David', 'Kim', 'Infrastructure Engineer'),
('Aisha', 'Mohammed', 'Compliance Officer'),
('Ryan', 'O''Brien', 'Sales Engineer'),
('Yuki', 'Tanaka', 'Quality Assurance Lead'),
('Isabella', 'Rossi', 'Design Lead'),
('Muhammad', 'Abbas', 'Platform Engineer'),
('Zara', 'Sheikh', 'Product Designer'),
('Tariq', 'Aziz', 'Engineering Manager'),
('Mehreen', 'Haider', 'Data Engineer'),
('Asad', 'Rehman', 'API Developer'),
('Saba', 'Naz', 'Frontend Lead'),
('Fahad', 'Zaman', 'Backend Lead'),
('Alina', 'Karim', 'Automation Engineer'),
('Shoaib', 'Akhtar', 'Performance Engineer'),
('Rubina', 'Latif', 'Technical Recruiter');
