import { Redirect, Route } from 'react-router-dom';
import { UtiliseAuth } from './context/auth';

function RoutePriveeUtilisateur({ component: Component, ...reste }) {
    const estAuthentifie = UtiliseAuth();
    
    return (
        <Route {...reste}
            render={(props) => estAuthentifie ? (
                <Component {...props} />
            ) : (
                    <Redirect to="/" />
                )
            }
        />
    )
}