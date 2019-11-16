import PlaceTwoTone from '@material-ui/icons/PlaceTwoTone';
import React from 'react';

const PinIcon = ({ size, color, onClick }) => (
  <PlaceTwoTone style={{ color, fontSize: size }} onClick={onClick} />
);

export default PinIcon;
