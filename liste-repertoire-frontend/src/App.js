import PageAccueil from './pages/PageAccueil';
import PageRepertoire from './pages/PageRepertoirePieces';
import PageAdmin from './pages/PageAdmin';
import PageAjouter from './pages/PageAjouterPiece';
import PageModifier from './pages/PageModifierPiece';
import PageSupprimer from './pages/PageSupprimerPiece';
import PageDemande from './pages/PageCreerDemandeSpeciale';
import PageAfficherDemande from './pages/PageAfficherDemandeAdmin';
import PageInscription from './pages/PageInscriptionUtilisateur';
import Page404 from './pages/Page404';
import BarreNavigation from './composants/BarreNavigation';
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
    <ContexteAuth.Provider value={{authentification, setAuthentification, estAdmin, setEstAdmin, 
      username, setUsername}}>
      <Router>
        <Container>
          <BarreNavigation />
          <Switch>
            <Route path="/" component={PageAccueil} exact />
            <Route path="/repertoire" component={PageRepertoire} />
            <Route path="/admin" component={PageAdmin} />
            <Route path="/demande" component={PageDemande} />
            <Route path="/modifier/:id" component={PageModifier} />
            <Route path="/supprimer/:id" component={PageSupprimer} />
            <Route path="/ajouter" component={PageAjouter} />
            <Route path="/afficher" component={PageAfficherDemande} />
            <Route path="/inscription" component={PageInscription} />
            <Route path="/connexion" component={PageConnexion} />
            <Route path="/gestionDemandesUtilisateur" component={PageGestionPourUtilisateur}/>
            <Route path="/modifierDemandeSpeciale" component={PageModifierDemandeSpeciale}/>
            <Route component={Page404} />
          </Switch>
        </Container>
      </Router>
    </ContexteAuth.Provider>
  );
}

export default App;
