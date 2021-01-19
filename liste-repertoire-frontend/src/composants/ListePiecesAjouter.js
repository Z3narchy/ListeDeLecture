import React from 'react';
import Alert from 'react-bootstrap/Alert'

function ListePiecesAjouter({ pieces }) {
    if (pieces?.length) {

        return (
            <>
                <ul>
                    {
                        pieces.map(piece => <li>{piece.titre} - {piece.artiste}</li>)
                    }
                </ul>
            </>
        );
    }
    else {
        return <h5 variant={"info"} >Aucune pièce ajoutée.</h5>;
    }
}

export default ListePiecesAjouter;