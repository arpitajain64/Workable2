import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      <ul className="space-y-4">
        <li><Link to="/admin/companies" className="block p-2 hover:bg-gray-700 rounded">Companies</Link></li>
        <li><Link to="/admin/jobs" className="block p-2 hover:bg-gray-700 rounded">Jobs</Link></li>
        <li><Link to="/admin/jobs/create" className="block p-2 hover:bg-gray-700 rounded">Post a Job</Link></li>
        <li><Link to="/admin/jobs/:id/applicants" className="block p-2 hover:bg-gray-700 rounded">Applicants</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;