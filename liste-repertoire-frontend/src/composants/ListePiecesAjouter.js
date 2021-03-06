import React from 'react';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';

function ListePiecesAjouter({ pieces, setListeDemande }) {
    const { t } = useTranslation();
    
    function SupprimerCategorie(index)
    {
        var piecesSupprimee = pieces.slice();
        piecesSupprimee.splice(index, 1);
        setListeDemande(piecesSupprimee);
    }

    if (pieces?.length) {
        return (
            <>
                <ul>
                    {pieces.map((piece, index) => 
                        <div key={index}>
                            <li  className="d-inline-block">- {piece.titre} - {piece.artiste}</li>
                            <Button className="m-1"variant={'danger'} onClick={() => SupprimerCategorie(index)}>X</Button>
                        </div>
                    )}
                </ul>
            </>
        );
    }
    else {
        return <h5 variant={"info"}>{t('aucunePieceAjoutee')}</h5>;
    }
}

export default ListePiecesAjouter;