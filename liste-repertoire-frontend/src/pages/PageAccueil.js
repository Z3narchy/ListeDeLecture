import React from 'react';
import { useTranslation } from 'react-i18next';


function PageAccueil() {
    const { t } = useTranslation();
    
    return (
        <>
            <h1>{t('pageAccueil')}</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec felis et mauris tristique ornare. Proin ante diam, aliquam ac libero vitae, finibus fermentum est. Quisque metus neque, vestibulum quis ante vulputate, elementum blandit arcu. Quisque ut magna mi. Nulla fringilla auctor commodo. Sed condimentum ipsum purus, eu efficitur lorem interdum molestie. Nam posuere augue magna, eget varius quam pulvinar ac. Etiam eget eros ultrices tellus condimentum sollicitudin.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec felis et mauris tristique ornare. Proin ante diam, aliquam ac libero vitae, finibus fermentum est. Quisque metus neque, vestibulum quis ante vulputate, elementum blandit arcu. Quisque ut magna mi. Nulla fringilla auctor commodo. Sed condimentum ipsum purus, eu efficitur lorem interdum molestie. Nam posuere augue magna, eget varius quam pulvinar ac. Etiam eget eros ultrices tellus condimentum sollicitudin.</p>
        </>
    );
}

export default PageAccueil;