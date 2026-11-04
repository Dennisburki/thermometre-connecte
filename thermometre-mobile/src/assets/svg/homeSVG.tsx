import React from 'react';

import Svg, { Path, G, Symbol } from 'react-native-svg';

export function HomeSVG(width: string, height: string, color: string) {
 return (
    <Svg width={width} height={height} viewBox="0 0 24 24">
     <Path fill={color} d="M6 19h3.692v-5.884h4.616V19H18v-9l-6-4.538L6 10zm-1 1V9.5l7-5.288L19 9.5V20h-5.692v-5.884h-2.616V20zm7-7.77" /></Svg>
 )
}
export default HomeSVG