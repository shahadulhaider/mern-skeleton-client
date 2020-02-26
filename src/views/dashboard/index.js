import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { connect } from "react-redux";

function Dashboard() {
  return (
    <div className="container">
      <DashboardContainer>
        <Typography variant="h4" align="center">
          Dashboard
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className="mt-5 btn btn-sm"
          type="submit"
        >
          <Link to="/users">View Users List</Link>
        </Button>
      </DashboardContainer>
    </div>
  );
}

const DashboardContainer = styled.div`
  margin-top: 4em;
  padding: 2em;
  height: 70vh;

  box-shadow: 0 0 8px 6px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
`;

export default connect(null, {})(Dashboard);
