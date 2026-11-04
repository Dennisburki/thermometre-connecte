import React from 'react';

import Svg, {Path} from 'react-native-svg';

export function ChartSVG(width: string, height: string, color: string)
{
   return (
      <Svg width={width} height={height} viewBox="0 0 24 24">
         <Path fill={color} d="m3.5 17.808l-.73-.731l6.807-6.808l4 4l6.985-8l.707.67l-7.653 8.83l-4.039-4.038z" /></Svg>
   )
}
export default ChartSVG