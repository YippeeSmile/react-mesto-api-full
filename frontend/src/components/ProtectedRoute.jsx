import React from 'react';
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ loggedIn, children, path }) {
  return (
    <Route path={path}>
      {loggedIn ? children : <Redirect to="/sign-in" />}
    </Route>
  );
}

export default ProtectedRoute;