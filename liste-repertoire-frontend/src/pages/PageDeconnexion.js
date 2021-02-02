import React from 'react';
import { Redirect } from 'react-router-dom';
import { UtiliseAuth } from '../context/Auth';

function PageDeconnexion()
{  const { setAuthentification, setEstAdmin, setUsername } = UtiliseAuth();

    setUsername(null)
    setEstAdmin(null)
    setAuthentification(null)
    
    return <Redirect to="/" />
}

export default PageDeconnexion;