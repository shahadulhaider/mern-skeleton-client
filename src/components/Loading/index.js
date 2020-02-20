import React from "react";
import { useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

import { LoadingComponent } from "./styles";

function Loading() {
  const loading = useSelector(state => state.app.loading);

  return (
    loading && (
      <LoadingComponent>
        <CircularProgress thickness={5} size={70} />
      </LoadingComponent>
    )
  );
}

export default Loading;
