import React from "react";
import SearchFilter from "../components/SearchFilter";

const OrganizationDashboard = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Organization Dashboard</h1>

      <SearchFilter />

      {/* Example placeholder for opportunities */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Posted Opportunities</h2>
        <p className="text-gray-600">You haven't posted any opportunities yet.</p>
      </div>
    </div>
  );
};

export default OrganizationDashboard;
