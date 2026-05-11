import React from 'react';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

interface IconProps {
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

export function MicIcon({ 
  color = '#6366F1', 
  size = 64,       
  style 
}: IconProps) {
  return (
    <Svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
    >
      <Path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <Path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <Path d="M12 19v4" />
      <Path d="M8 23h8" />
    </Svg>
  );
}
