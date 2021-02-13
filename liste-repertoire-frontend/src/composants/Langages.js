import { React, useEffect } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'



import { useTranslation } from 'react-i18next';

function Langages(){
    const { i18n } = useTranslation();

    useEffect(() => i18n.changeLanguage('fr'), [i18n]);

    function changerLangue(langue){
        i18n.changeLanguage(langue)
    }

    return(
        <Row className="mt-3">
            <Col xs={{span: 6, offset: 6}} sm={{span: 3, offset: 9 }} lg={{span: 2, offset: 10}}>
                <Form.Group>
                    <Form.Control as="select" onChange={(event) => changerLangue(event.target.value)}>
                        <option value="fr">Français</option>
                        <option value="en">English</option>
                    </Form.Control>
                </Form.Group>
            </Col>
        </Row>
    )
}

export default Langages;