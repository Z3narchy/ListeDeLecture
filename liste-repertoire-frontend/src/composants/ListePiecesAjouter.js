import React from 'react';
import Alert from 'react-bootstrap/Alert'

function ListePiecesAjouter({ pieces }) {
    if (pieces?.length) {
        
        return (
            <>
                <div >
                    <ul>
                        {
                            pieces.map(piece => <li>{piece.titre} - {piece.artiste}</li>)
                        }
                    </ul>
                </div>
            </>
        );
    }
    else {
        return <h5 variant={"info"} >Il n'y a pas de pièces dans le répertoire.</h5>;
    }
}

export default ListePiecesAjouter;