import React from "react";
import { connect } from "react-redux";

function Dashboard() {
  return (
    <div className="container">
      <h1>Dashboard</h1>
    </div>
  );
}

export default connect(null, {})(Dashboard);
