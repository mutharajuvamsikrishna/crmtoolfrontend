import React from 'react';
import OnieLogoImage from './Images/oniesoft-final1.png'; // Adjust the path accordingly

const Onielogo = () => {
  const logoStyle1 = {
    position: 'absolute',
    top:20,
    left: 0,
  };

  return (
    <div style={logoStyle1}>
      <a href="/">
        <img
          src={OnieLogoImage}
          alt="ONiE SOFT"
          width="250px"
          height="75px"
        />
      </a>
    </div>
  );
};

export default Onielogo;
