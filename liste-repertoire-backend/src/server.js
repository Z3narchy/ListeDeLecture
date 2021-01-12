import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient, ObjectID } from 'mongodb';

const app = express();

app.use(bodyParser.json());

const utiliserDB = async (operations, reponse) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017', {useUnifiedTopology: true});
        const db = client.db('liste-repertoire');

        await operations(db);

        client.close();
    }
    catch(erreur) {
        reponse.status(500).send("Erreur de connexion à la bd", erreur);
    }
};

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
        () => reponse.status(500).send("Pièce non trouvée")
    );
});

app.put('/api/pieces/ajouter', (requete, reponse) => {
    const {titre, artiste, categorie} = requete.body;

    if (titre !== undefined && artiste !== undefined && categorie !== undefined) {
        utiliserDB(async (db) => {
            await db.collection('pieces').insertOne({ 
                titre: titre,
                artiste: artiste,
                categorie: categorie
            });
            
            reponse.status(200).send("Pièce ajoutée");
        }, reponse).catch(
            () => reponse.status(500).send("Erreur : la pièce n'a pas été ajoutée")
        );;        
    }
    else {
        reponse.status(500).send(`Certains paramètres ne sont pas définis :
            - titre: ${titre}
            - artiste: ${artiste}
            - categorie: ${categorie}`);
    }
});

app.post('/api/pieces/modifier/:id', (requete, reponse) => {
    const {titre, artiste, categorie} = requete.body;
    const id = requete.params.id;

    if (titre !== undefined && artiste !== undefined && categorie !== undefined) {
        utiliserDB(async (db) => {
            var objectId = ObjectID.createFromHexString(id);
            await db.collection('pieces').updateOne({ _id: objectId }, {
                '$set': {
                    titre: titre,
                    artiste: artiste,
                    categorie: categorie
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
            - categorie: ${categorie}`);
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

app.listen(8000, () => console.log("Serveur démarré sur le port 8000"));