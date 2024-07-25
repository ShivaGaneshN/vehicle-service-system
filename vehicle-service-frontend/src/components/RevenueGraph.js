import React, { useState, useEffect } from 'react';
import { Paper } from '@material-ui/core';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getRevenueStats } from '../services/api';

function RevenueGraph() {
  const [revenueData, setRevenueData] = useState(null);

  useEffect(() => {
    getRevenueStats().then(setRevenueData);
  }, []);

  if (!revenueData) {
    return <div>Loading...</div>;
  }

  const data = [
    { name: 'Daily', revenue: revenueData.daily_revenue },
    { name: 'Monthly', revenue: revenueData.monthly_revenue },
    { name: 'Yearly', revenue: revenueData.yearly_revenue },
  ];

  return (
    <Paper style={{ padding: '20px' }}>
      <h2>Revenue Statistics</h2>
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  );
}

export default RevenueGraph;