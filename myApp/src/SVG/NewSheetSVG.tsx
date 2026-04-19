import * as React from "react";
import Svg, { SvgProps, Rect, Circle, Polyline, Path } from "react-native-svg";

export const PictureIcon = (props: SvgProps) => (
  <Svg
    width={22}
    height={22}
    viewBox="0 0 24 24"
    fill="none"
    stroke={props.color || "#9CA3AF"}
    strokeWidth={1.5}
    {...props}
  >
    <Rect x={3} y={3} width={18} height={18} rx={2} />
    <Circle cx={8.5} cy={8.5} r={1.5} />
    <Polyline points="21 15 16 10 5 21" />
  </Svg>
);

export const DeleteIcon = (props: SvgProps) => (
  <Svg
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke={props.color || "#EF4444"}
    strokeWidth={2}
    {...props}
  >
    <Polyline points="3 6 5 6 21 6" />
    <Path d="M19 6l-1 14H6L5 6" />
    <Path d="M10 11v6M14 11v6" />
    <Path d="M9 6V4h6v2" />
  </Svg>
);
