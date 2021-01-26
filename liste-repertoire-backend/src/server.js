import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient, ObjectID } from 'mongodb';

const app = express();

app.use(bodyParser.json());

//---------- Connexion BD ----------
const utiliserDB = async (operations, reponse) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true });
        const db = client.db('liste-repertoire');

        await operations(db);

        client.close();
    }
    catch (erreur) {
        reponse.status(500).send("Erreur de connexion à la bd", erreur);
    }
};

//---------- Pieces ----------
app.get('/api/pieces', (requete, reponse) => {
    utiliserDB(async (db) => {
        const listePieces = await db.collection('pieces').find().toArray();
        reponse.status(200).json(listePieces);
    }, reponse).catch(
        () => reponse.status(500).send("Erreur lors de la requête")
    );;
});

app.get('/api/pieces/:id', (requete, reponse) => {
    const id = requete.params.id;

    utiliserDB(async (db) => {
        var objectId = ObjectID.createFromHexString(id);
        const infoPiece = await db.collection('pieces').findOne({ _id: objectId });
        reponse.status(200).json(infoPiece);
    }, reponse).catch(
        () => reponse.status(404).send("Pièce non trouvée")
    );
});

app.post('/api/pieces/ajouter', (requete, reponse) => {
    //const {titre, artiste, categories} = requete.body;
    const titre = requete.body.titre;
    const artiste = requete.body.artiste;
    const categories = requete.body.categories;


    if (titre !== undefined && artiste !== undefined && categories !== undefined) {
        utiliserDB(async (db) => {
            await db.collection('pieces').insertOne({
                titre: titre,
                artiste: artiste,
                categorie: categories
            });

            reponse.status(200).send("Pièce ajoutée");
        }, reponse).catch(
            () => reponse.status(500).send("Erreur : la pièce n'a pas été ajoutée")
        );
    }
    else {
        reponse.status(500).send(`Certains paramètres ne sont pas définis :
            - titre: ${titre}
            - artiste: ${artiste}
            - categorie: ${categories}`);
    }
});

app.put('/api/pieces/modifier/:id', (requete, reponse) => {
    //const {titre, artiste, categories} = requete.body;
    const titre = requete.body.titre;
    const artiste = requete.body.artiste;
    const categories = requete.body.categories;
    const id = requete.params.id;
    console.log(titre, artiste, categories)

    if (titre !== undefined && artiste !== undefined && categories !== undefined) {
        utiliserDB(async (db) => {
            var objectId = ObjectID.createFromHexString(id);
            await db.collection('pieces').updateOne({ _id: objectId }, {
                '$set': {
                    titre: titre,
                    artiste: artiste,
                    categorie: categories
                }
            });

            reponse.status(200).send("Pièce modifiée");
        }, reponse).catch(
            () => reponse.status(500).send("Erreur : la pièce n'a pas été modifiée")
        );
    }
    else {
        reponse.status(500).send(`Certains paramètres ne sont pas définis :
            - titre: ${titre}
            - artiste: ${artiste}
            - categorie: ${categories}`);
    }
});

app.delete('/api/pieces/supprimer/:id', (requete, reponse) => {
    const id = requete.params.id;

    utiliserDB(async (db) => {
        var objectId = ObjectID.createFromHexString(id);
        const resultat = await db.collection('pieces').deleteOne({ _id: objectId });

        reponse.status(200).send(`${resultat.deletedCount} pièce supprimée`);
    }, reponse).catch(
        () => reponse.status(500).send("Erreur : la pièce n'a pas été supprimée")
    );
});

//---------- Demandes Spéciales ----------
app.get('/api/demandesSpeciales', (requete, reponse) => {
    utiliserDB(async (db) => {
        const listeDemandes = await db.collection('demandesSpeciales').find().toArray();
        reponse.status(200).json(listeDemandes);
    }, reponse).catch(
        () => reponse.status(500).send("Erreur lors de la requête")
    );;
});

app.get('/api/demandesSpeciales/:username', (requete, reponse) => {
    const username = requete.params.username;
    utiliserDB(async (db) => {
        const listeDemandes = await db.collection('demandesSpeciales').find({ username: username }).toArray();
        reponse.status(200).json(listeDemandes);
    }, reponse).catch(
        () => reponse.status(500).send("Erreur lors de la requête")
    );;
});

app.post('/api/demandesSpeciales/ajouter', (requete, reponse) => {
    const { name, listeDemandes, estActive, dateAjout } = requete.body;

    if (name !== undefined && listeDemandes !== undefined
        && estActive !== undefined && dateAjout !== undefined) {
        utiliserDB(async (db) => {
            await db.collection('demandesSpeciales').insertOne({
                name: name,
                listeChansons: listeDemandes,
                estActive: estActive,
                dateAjout: dateAjout
            });

            reponse.status(200).send("liste de demandes ajoutees");
        }, reponse).catch(
            () => reponse.status(500).send("Erreur : la liste des demandes speciales n'était pas bien remplie")
        );
    }
    else {
        reponse.status(500).send(`Certains paramètres ne sont pas définis :
            - name: ${name}
            - listeChansons: ${listeDemandes}
            - estActive: ${estActive}
            -dateAjout: ${dateAjout}`);
    }
});

app.put('/api/demandesSpeciales/modifier/:id', (requete, reponse) => {
    const { name, listeChansons, estActive, dateAjout } = requete.body;
    const id = requete.params.id;

    if (name !== undefined && listeChansons !== undefined
        && estActive !== undefined && dateAjout !== undefined) {
        utiliserDB(async (db) => {
            var objectId = ObjectID.createFromHexString(id);
            await db.collection('demandesSpeciales').updateOne({ _id: objectId }, {
                '$set': {
                    name: name,
                    listeChansons: listeChansons,
                    estActive: estActive,
                    dateAjout: dateAjout
                }
            });

            reponse.status(200).send("liste de demandes speciales modifiees");
        }, reponse).catch(
            () => reponse.status(500).send("Erreur : la pièce n'a pas été modifiée")
        );
    }
    else {
        reponse.status(500).send(`Certains paramètres ne sont pas définis :
            - nom: ${name}
            - artiste: ${listeChansons}
            - estActive: ${estActive}
            - dateAjout: ${dateAjout}`);
    }
});

//---------- Authentification ----------
app.get('/api/utilisateurs', (requete, reponse) => {
    var utilisateurs=[];
    utiliserDB(async (db) => {
        utilisateur = await db.collection('utilisateurs').find().toArray();

        reponse.status(200).json(utilisateurs);
    }, reponse).catch(
        () => reponse.status(500).send("Erreur lors de la requête")
    );;
});

app.get('/api/utilisateurs/:username', (requete, reponse) => {
    const usernameRequete = requete.params.username;
    const motPasseRequete = requete.body.motPasse;

    utiliserDB(async (db) => {
        const utilisateur = await db.collection('utilisateurs').findOne({ username: usernameRequete });
        var authentification = {
            username: "",
            estValide: false,
            estAdmin: false
        }

        if (utilisateur !== undefined) {
            authentification.username = utilisateur.username;
            authentification.estValide = utilisateur.motPasse === motPasseRequete;
            authentification.estAdmin = utilisateur.estAdmin;
        };

        reponse.status(200).json(authentification);
    }, reponse).catch(
        () => reponse.status(500).send("Erreur lors de la requête")
    );
});

//TODO - Incomplet
// app.post('/api/utilisateurs/ajouter', (requete, reponse) => {
//     const nouvelUtilisateur = requete.body;

//     if (nouvelUtilisateur) {
//         utiliserDB(async (db) => {
//             await db.collection('demandesSpeciales').insertOne({
//                 name: name,
//                 listeChansons: listeDemandes,
//                 estActive: estActive,
//                 dateAjout: dateAjout
//             });

//             reponse.status(200).send("liste de demandes ajoutees");
//         }, reponse).catch(
//             () => reponse.status(500).send("Erreur : la liste des demandes speciales n'était pas bien remplie")
//         );
//     }
//     else {
//         reponse.status(500).send(`Certains paramètres ne sont pas définis :
//             - name: ${name}
//             - listeChansons: ${listeDemandes}
//             - estActive: ${estActive}
//             -dateAjout: ${dateAjout}`);
//     }
// });

app.listen(8000, () => console.log("Serveur démarré sur le port 8000"));