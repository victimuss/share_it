import * as React from "react";
import Svg, { SvgProps, Rect, Path, Circle, Polyline } from "react-native-svg";

export const LockIcon = (props: SvgProps) => (
  <Svg
    width={28}
    height={28}
    viewBox="0 0 24 24"
    fill="none"
    stroke={props.color || "#fff"}
    strokeWidth={2}
    {...props}
  >
    <Rect x={3} y={11} width={18} height={11} rx={2} ry={2} />
    <Path d="M7 11V7a5 5 0 0 1 10 0v4" />
    <Circle cx={12} cy={16} r={1} fill={props.color || "#fff"} stroke="none" />
  </Svg>
);

export const CheckmarkIcon = (props: SvgProps) => (
  <Svg
    width={14}
    height={14}
    viewBox="0 0 24 24"
    fill="none"
    stroke={props.color || "#6366F1"}
    strokeWidth={2}
    style={[{ flexShrink: 0, marginTop: 2 }, props.style]}
    {...props}
  >
    <Polyline points="20 6 9 17 4 12" />
  </Svg>
);

export const CopyIcon = (props: SvgProps) => (
  <Svg
    width={15}
    height={15}
    viewBox="0 0 24 24"
    fill="none"
    stroke={props.color || "#1F2937"}
    strokeWidth={2}
    {...props}
  >
    <Rect x={9} y={9} width={13} height={13} rx={2} />
    <Path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </Svg>
);
