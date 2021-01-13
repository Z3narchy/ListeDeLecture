import React from 'react';
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button';


function ListePiecesDemande({ pieces, liste }) {
    if(pieces?.length) {
        var tableauCategories = [];

        pieces.forEach(piece => {

            piece.categorie.forEach(categorie => {
                console.log(categorie);

                if (!tableauCategories.includes(categorie)) {

                    if (tableauCategories[categorie] === undefined) {
                        tableauCategories.push(categorie);
                    }

                }

            })
        });



        return (
            <>
                {tableauCategories.map((categorie) => {
                    const piecesAssociees = pieces.filter((piece) => piece.categorie.includes(categorie));
                    return (
                        <div key={categorie}>
                            <h4>{categorie}</h4>
                            <ul>
                                {
                                    piecesAssociees.map(piece =>
                                        <div> <li key={piece._id}>{piece.titre} - {piece.artiste}</li>
                                    <Button variant="primary" className="aline"> Add</Button></div>)
                                    
                                }
                            </ul>
                            
                        </div>
                    )
                })}
            </>
        );
    }
    else {
        return <Alert variant={"info"} >Il n'y a pas de pièces dans le répertoire.</Alert>;
    }
}

export default ListePiecesDemande;

/*
<Button variant="primary" onClick={envoyerDemande} >
                                 Envoyer
                                </Button>

                                */
