import Sidebar from './Sidebar';

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Welcome to the Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">Manage jobs, companies, and applicants from here.</p>
      </main>
    </div>
  );
};

export default Dashboard;
