import React, { useState, useEffect } from 'react';
import { getDashboardData } from '../utils/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getDashboardData();
        if (data) {
          setDashboardData(data);
        } else {
          setError('No data received');
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8">{error}</div>;
  if (!dashboardData) return <div className="text-center mt-8">No data available</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2">Total Projects</h2>
          <p className="text-3xl font-bold text-blue-600">{dashboardData.totalProjects ?? 'N/A'}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2">Funded Projects</h2>
          <p className="text-3xl font-bold text-green-600">{dashboardData.fundedProjects ?? 'N/A'}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2">Total Funds Raised</h2>
          <p className="text-3xl font-bold text-purple-600">
            ${dashboardData.totalFundsRaised ? dashboardData.totalFundsRaised.toLocaleString() : 'N/A'}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2">Avg. Funding %</h2>
          <p className="text-3xl font-bold text-orange-600">
            {dashboardData.avgFundingPercentage !== undefined ? dashboardData.avgFundingPercentage : 'N/A'}%
          </p>
        </div>
      </div>

      {dashboardData.fundsByCategory?.length ? (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Funds Raised by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardData.fundsByCategory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-center">No data available for categories.</p>
      )}

      {dashboardData.recentProjects?.length ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Recent Projects</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">Project</th>
                  <th className="px-4 py-2 text-left">Goal</th>
                  <th className="px-4 py-2 text-left">Raised</th>
                  <th className="px-4 py-2 text-left">Progress</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.recentProjects.map((project) => (
                  <tr key={project.id} className="border-b">
                    <td className="px-4 py-2">{project.title}</td>
                    <td className="px-4 py-2">
                      ${project.goalAmount ? project.goalAmount.toLocaleString() : 'N/A'}
                    </td>
                    <td className="px-4 py-2">
                      ${project.raisedAmount ? project.raisedAmount.toLocaleString() : 'N/A'}
                    </td>
                    <td className="px-4 py-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-green-600 h-2.5 rounded-full" 
                          style={{ width: `${project.raisedAmount && project.goalAmount ? (project.raisedAmount / project.goalAmount) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-center">No recent projects available.</p>
      )}
    </div>
  );
};

export default Dashboard;
