// src/components/Avatar.js

import React from 'react';
import PropTypes from 'prop-types';

const Avatar = ({ initial, size, bgColor, textColor }) => {
    return (
        <div
            className={`flex items-center justify-center ${bgColor} ${textColor} ${size} rounded-lg`}
            style={{ fontSize: '2rem' }}
        >
            {initial}
        </div>
    );
};

Avatar.propTypes = {
    initial: PropTypes.string.isRequired,
    size: PropTypes.string,
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
};

Avatar.defaultProps = {
    size: 'h-16 w-16', // Taille par défaut de 64px x 64px
    bgColor: 'bg-primary', // Couleur de fond par défaut
    textColor: 'text-black', // Couleur de texte par défaut
};

export default Avatar;
