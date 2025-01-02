import React from 'react'
import ProtectedRoute from '@/components/ProtectedRoute';

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <div>
        <h1>Dashboard</h1>
      </div>
    </ProtectedRoute>
  )
}

export default Dashboard