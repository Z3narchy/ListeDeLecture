import React from 'react';

function ListePiecesAjouter({ pieces }) {
    if (pieces?.length) {

        return (
            <>
                <ul>
                    {
                        pieces.map(piece => <li key={piece._id}>{piece.titre} - {piece.artiste}</li>)
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