import { Redirect, Route } from 'react-router-dom';
import { UtiliseAuth } from '../context/Auth';

function RoutePriveeUtilisateur({ component: Component, ...reste }) {
    const { authentification } = UtiliseAuth();
    
    return (
        <Route {...reste}
            render={(props) => authentification ? (
                <Component {...props} />
            ) : (
                    <Redirect to="/" />
                )
            }
        />
    )
}

export default RoutePriveeUtilisateur;

