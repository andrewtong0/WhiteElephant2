import React from 'react';
import { ColourGradient } from './interfaces';

interface ColouredBackgroundProps {
  gradient: ColourGradient;
  children: React.ReactNode;
}

const ColouredBackground: React.FC<ColouredBackgroundProps> = ({ gradient, children }) => {
  const { colour1, colour2, blendingMode } = gradient;

  const backgroundStyle = {
    background: `${colour1}, ${colour2}`,
    backgroundBlendMode: blendingMode as React.CSSProperties['mixBlendMode'],
    width: '100%',
    height: '100%',
    color: 'white',
  };

  return <div style={backgroundStyle}>{children}</div>;
};

export default ColouredBackground;

