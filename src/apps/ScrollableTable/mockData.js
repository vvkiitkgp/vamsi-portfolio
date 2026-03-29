export const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
  { key: 'department', label: 'Department' },
  { key: 'status', label: 'Status' },
  { key: 'notes', label: 'Notes' },
];

// Mix of short, medium, and long values per column
const names = [
  'Alice Johnson', 'Bob Smith', 'Clara Davis', 'David Lee', 'Eva Martinez',
  'Frank Wilson', 'Grace Kim', 'Henry Brown', 'Isla Turner', 'Jack White',
  'Karen Hall', 'Liam Adams', 'Mia Scott', 'Noah Baker', 'Olivia Carter',
  'Peter Evans', 'Quinn Foster', 'Rachel Green', 'Sam Hughes', 'Tina Iyer',
  'Uma Jenkins', 'Victor King', 'Wendy Long', 'Xander Moore', 'Yara Nelson',
  'Zoe Owen', 'Aaron Parker', 'Beth Quinn', 'Carlos Reed', 'Diana Shaw',
  'Ethan Thomas', 'Fiona Upton', 'George Vance', 'Hannah Webb', 'Ian Xavier',
  'Julia Young', 'Kevin Zhang', 'Laura Brooks', 'Michael Cole', 'Nancy Dixon',
];

// Short, medium, and long role values
const roles = [
  'Engineer',
  'Senior Software Engineer',
  'Lead',
  'Principal Product Designer',
  'Analyst',
  'Staff Infrastructure Engineer',
  'Intern',
  'Associate UX Researcher',
  'Manager',
  'Director of Engineering',
];

// Short, medium, and long department values
const departments = [
  'Engineering',
  'Product Design & Research',
  'Sales',
  'Platform Infrastructure & DevOps',
  'HR',
  'Customer Success & Support',
  'Marketing',
  'Data Science & Analytics',
  'Finance',
  'Security & Compliance',
];

// Short, medium, and long status values
const statuses = [
  'Active',
  'On Leave',
  'Remote',
  'Inactive — Pending Offboarding',
  'Active — Probation Period',
  'Contract',
  'Part-time Remote',
  'Active',
  'On Leave — Medical',
  'Inactive',
];

// Deliberately mixed-length notes — short, medium, and long
const notes = [
  'N/A',
  'Top performer Q2.',
  'Awaiting onboarding docs.',
  'Transferred from the London office in March. Currently settling into the new team and getting up to speed with the codebase.',
  'No issues.',
  'Leads the weekly design review. Has been instrumental in redesigning the checkout flow, reducing drop-off by 18% over two quarters.',
  'New hire.',
  'Requested flexible hours.',
  'On a performance improvement plan since April. Weekly check-ins scheduled with HR and direct manager until end of Q3.',
  'Strong communicator.',
  'Mentors two junior engineers on the platform team and runs a bi-weekly knowledge-sharing session open to the whole department.',
  'Remote — US Pacific.',
  'Budget approval pending.',
  'Promoted in January.',
  'Currently leading a cross-functional initiative to migrate legacy services to a microservices architecture. ETA end of year.',
  'On parental leave.',
  'Handles escalations.',
  'Joined via acquisition.',
  'Recognised as Employee of the Month for three consecutive months due to outstanding client delivery and team collaboration.',
  'Contract ends Sept.',
  'Excellent feedback.',
  'Requires ergonomic setup.',
  'Volunteered to lead the diversity and inclusion working group in addition to primary responsibilities. Very proactive.',
  'TBD',
  'Awaiting clearance.',
  'Co-authored the internal API design guidelines document that is now used as the standard reference across all backend teams.',
  'Part-time Fridays.',
  'Training in progress.',
  'High attrition risk — flagged by manager. Compensation review scheduled for next sprint planning cycle.',
  'Active on-call rota.',
  'Seconded to APAC.',
  'Key account owner.',
  'Consistently ships ahead of deadlines and has never missed a sprint commitment since joining fourteen months ago.',
  'Leave until July.',
  'Visa renewal due.',
  'Shadowing the VP of Product for the quarter as part of the leadership development programme.',
  'No notes yet.',
  'Handles GDPR queries.',
  'Strong technical skills. Recently completed AWS Solutions Architect certification and is applying it to the current cloud migration project.',
  'Peer review done.',
];

export const tableData = names.map((name, i) => ({
  id: i + 1,
  name,
  role: roles[i % roles.length],
  department: departments[i % departments.length],
  status: statuses[i % statuses.length],
  notes: notes[i % notes.length],
}));
