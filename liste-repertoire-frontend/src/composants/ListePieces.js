import React from 'react';
import Alert from 'react-bootstrap/Alert'

function ListePieces({ pieces }) {
    if (pieces?.length) {
        var tableauCategories = [];

        pieces.forEach(piece => {

            piece.categorie.forEach(categorie => {
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
                            piecesAssociees.map(piece => <li key={piece._id}>{piece.titre} - {piece.artiste}</li>)
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

export default ListePieces;