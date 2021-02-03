import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UtiliseAuth } from '../context/Auth';

function RoutePriveeAdmin({ component: Component, ...reste }) {
    const { authentification } = UtiliseAuth();
    const { estAdmin } = UtiliseAuth();

    return (
      <Route {...reste}
        render={(props) => authentification && estAdmin === "true"  ? (
                <Component {...props} />
            ) : (
                <Redirect to="/" />
            )
        }
      />
    );
}

export default RoutePriveeAdmin;