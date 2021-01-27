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
import PageGestionPourUtilisateur from './pages/PageGestionPourUtilisateur';
import PageModifierDemandeSpeciale from './pages/PageModifierDemandeSpeciale';
import { ContexteAuth } from './context/Auth';
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
            <Route path="/admin" component={PageAdmin} />
            <Route path="/creerDemandeSpeciale" component={PageCreerDemandeSpeciale} />
            <Route path="/modifierPiece/:id" component={PageModifierPiece} />
            <Route path="/supprimerPiece/:id" component={PageSupprimerPiece} />
            <Route path="/ajouterPiece" component={PageAjouterPiece} />
            <Route path="/afficherDemandesAdmin" component={PageAfficherDemandeAdmin} />
            <Route path="/inscription" component={PageInscription} />
            <Route path="/connexion" component={PageConnexion} />
            <Route path="/gestionUtilisateur" component={PageGestionUsager} />
            <Route path="/gestionDemandesUtilisateur" component={PageGestionPourUtilisateur}/>
            <Route path="/modifierDemandeSpeciale/:id" component={PageModifierDemandeSpeciale}/>
            <Route component={Page404} />
          </Switch>
        </Container>
      </Router>
    </ContexteAuth.Provider>
  );
}

export default App;
