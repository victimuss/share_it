import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

interface IconProps {
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

export function SearchIcon({ 
  color = '#9CA3AF', 
  size = 15,       
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
      style={[{ flexShrink: 0 }, style]}
    >
      <Circle cx={11} cy={11} r={8} />
      <Path d="m21 21-4.35-4.35" />
    </Svg>
  );
}

export function CloseIcon({ 
  color = '#9CA3AF', 
  size = 15,       
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
      <Path d="M18 6L6 18" />
      <Path d="M6 6l12 12" />
    </Svg>
  );
}

export function FilterIcon({ 
  color = '#9CA3AF', 
  size = 24,       
  style 
}: IconProps) {
  return (
    <Svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      style={style}
    >
      <Path fill={color} d="M10 18h4v-2h-4zM3 6v2h18V6zm3 7h12v-2H6z" />
    </Svg>
  );
}
