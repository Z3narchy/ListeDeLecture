import PageAccueil from './pages/PageAccueil';
import PageRepertoirePieces from './pages/PageRepertoirePieces';
import PageAdmin from './pages/PageAdmin';
import PageAjouterPiece from './pages/PageAjouterPiece';
import PageModifierPiece from './pages/PageModifierPiece';
import PageSupprimerPiece from './pages/PageSupprimerPiece';
import PageCreerDemandeSpeciale from './pages/PageCreerDemandeSpeciale';
import PageAfficherDemandeAdmin from './pages/PageAfficherDemandeAdmin';
import PageInscription from './pages/PageInscription';
import Page404 from './pages/Page404';
import BarreNavigation from './composants/BarreNavigation';
import PageGestionUsager from './pages/PageGestionUsager';
import PageConnexion from './pages/PageConnexionUtilisateur';
import PageDeconnexion from './pages/PageDeconnexion';
import PageGestionPourUtilisateur from './pages/PageGestionPourUtilisateur';
import PageModifierDemandeSpeciale from './pages/PageModifierDemandeSpeciale';
import { ContexteAuth } from './context/Auth';
import RoutePriveeAdmin from './composants/RoutePriveeAdmin';
import RoutePriveeUtilisateur from './composants/RoutePriveeUtilisateur';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import {
  React,
  useState, 
} from 'react';

function App() {
  const [authentification, setAuthentification]  = useState(false);
  const [estAdmin, setEstAdmin]  = useState(false); 
  const [username, setUsername]  = useState(false); 

  return (
    <ContexteAuth.Provider value={{authentification, setAuthentification, estAdmin, setEstAdmin, username, setUsername}}>
      <Router>
        <Container>
          <BarreNavigation />
          <Switch>
            <Route path="/" component={PageAccueil} exact />
            <Route path="/repertoirePieces" component={PageRepertoirePieces} />
            <Route path="/inscription" component={PageInscription} />
            <Route path="/connexion" component={PageConnexion} />
            <RoutePriveeUtilisateur path="/creerDemandeSpeciale" component={PageCreerDemandeSpeciale} />
            <RoutePriveeUtilisateur path="/deconnexion" component={PageDeconnexion} />
            <RoutePriveeUtilisateur path="/gestionDemandesUtilisateur" component={PageGestionPourUtilisateur}/>
            <RoutePriveeUtilisateur path="/modifierDemandeSpeciale/:id" component={PageModifierDemandeSpeciale}/>
            <RoutePriveeAdmin path="/ajouterPiece" component={PageAjouterPiece} />
            <RoutePriveeAdmin path="/modifierPiece/:id" component={PageModifierPiece} />
            <RoutePriveeAdmin path="/supprimerPiece/:id" component={PageSupprimerPiece} />
            <RoutePriveeAdmin path="/admin" component={PageAdmin} />
            <RoutePriveeAdmin path="/afficherDemandesAdmin" component={PageAfficherDemandeAdmin} />
            <RoutePriveeAdmin path="/gestionUtilisateur" component={PageGestionUsager} />
            <Route component={Page404} />
          </Switch>
        </Container>
      </Router>
    </ContexteAuth.Provider>
  );
}

export default App;
