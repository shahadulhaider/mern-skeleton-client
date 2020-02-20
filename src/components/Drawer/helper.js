import React from "react";
import ListItem from "@material-ui/core/ListItem";
import { Link } from "react-router-dom";

export const getNavClassNames = (pathname, currentPathname) => {
  return pathname === currentPathname ? "active" : null;
};

export const ListItemLink = props => {
  return <ListItem button component={Link} {...props} />;
};

export const ListItemButton = props => {
  return <ListItem button component="a" {...props} />;
};
