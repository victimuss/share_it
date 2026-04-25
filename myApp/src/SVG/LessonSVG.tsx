import * as React from "react";
import Svg, { SvgProps, Path, Circle, Polyline, Polygon, Line } from "react-native-svg";

export const LessonBackIcon = (props: SvgProps) => (
  <Svg
    width={props.width || 14}
    height={props.height || 14}
    viewBox="0 0 24 24"
    fill="none"
    stroke={props.color || "#fff"}
    strokeWidth={2}
    {...props}
  >
    <Path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const LessonMoreIcon = (props: SvgProps) => (
  <Svg
    width={props.width || 14}
    height={props.height || 14}
    viewBox="0 0 24 24"
    fill="none"
    stroke={props.color || "#fff"}
    strokeWidth={2}
    {...props}
  >
    <Circle cx="12" cy="5" r="1" />
    <Circle cx="12" cy="12" r="1" />
    <Circle cx="12" cy="19" r="1" />
  </Svg>
);

export const LessonFileIcon = (props: SvgProps) => (
  <Svg
    width={props.width || 16}
    height={props.height || 16}
    viewBox="0 0 24 24"
    fill="none"
    stroke={props.color || "#6366F1"}
    strokeWidth={2}
    {...props}
  >
    <Path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <Polyline points="14 2 14 8 20 8" />
  </Svg>
);

export const LessonUsersIcon = (props: SvgProps) => (
  <Svg
    width={props.width || 16}
    height={props.height || 16}
    viewBox="0 0 24 24"
    fill="none"
    stroke={props.color || "#10B981"}
    strokeWidth={2}
    {...props}
  >
    <Path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <Circle cx="9" cy="7" r="4" />
    <Path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <Path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </Svg>
);

export const LessonStarIcon = (props: SvgProps) => (
  <Svg
    width={props.width || 16}
    height={props.height || 16}
    viewBox="0 0 24 24"
    fill="none"
    stroke={props.color || "#F59E0B"}
    strokeWidth={2}
    {...props}
  >
    <Polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </Svg>
);

export const LessonStarFilledIcon = (props: SvgProps) => (
  <Svg
    width={props.width || 26}
    height={props.height || 26}
    viewBox="0 0 24 24"
    fill={props.color || "#F59E0B"}
    stroke={props.color || "#F59E0B"}
    strokeWidth={1.5}
    {...props}
  >
    <Polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </Svg>
);

export const LessonLikeIcon = (props: SvgProps) => (
  <Svg
    width={props.width || 18}
    height={props.height || 18}
    viewBox="0 0 24 24"
    fill="none"
    stroke={props.color || "#9CA3AF"}
    strokeWidth={2}
    {...props}
  >
    <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </Svg>
);

export const LessonDislikeIcon = (props: SvgProps) => (
  <Svg
    width={props.width || 18}
    height={props.height || 18}
    viewBox="0 0 24 24"
    fill="none"
    stroke={props.color || "#9CA3AF"}
    strokeWidth={2}
    style={{ transform: [{ rotate: "180deg" }] }}
    {...props}
  >
    <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </Svg>
);

export const LessonArrowLeftIcon = (props: SvgProps) => (
  <Svg
    width={props.width || 14}
    height={props.height || 14}
    viewBox="0 0 24 24"
    fill="none"
    stroke={props.color || "#6B7280"}
    strokeWidth={2}
    {...props}
  >
    <Path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const LessonBookmarkIcon = (props: SvgProps) => (
  <Svg
    width={props.width || 14}
    height={props.height || 14}
    viewBox="0 0 24 24"
    fill={props.color || "#6366F1"}
    stroke={props.color || "#6366F1"}
    strokeWidth={2}
    {...props}
  >
    <Path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const LessonInfoIcon = (props: SvgProps) => (
  <Svg
    width={props.width || 16}
    height={props.height || 16}
    viewBox="0 0 24 24"
    fill="none"
    stroke={props.color || "#6366F1"}
    strokeWidth={2}
    {...props}
  >
    <Circle cx="12" cy="12" r="10" />
    <Line x1="12" y1="8" x2="12" y2="12" />
    <Line x1="12" y1="16" x2="12.01" y2="16" />
  </Svg>
);

export const LessonWarningIcon = (props: SvgProps) => (
  <Svg
    width={props.width || 16}
    height={props.height || 16}
    viewBox="0 0 24 24"
    fill="none"
    stroke={props.color || "#D97706"}
    strokeWidth={2}
    {...props}
  >
    <Path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <Line x1="12" y1="9" x2="12" y2="13" />
    <Line x1="12" y1="17" x2="12.01" y2="17" />
  </Svg>
);

export const LessonArrowRightIcon = (props: SvgProps) => (
  <Svg
    width={props.width || 13}
    height={props.height || 13}
    viewBox="0 0 24 24"
    fill="none"
    stroke={props.color || "currentColor"}
    strokeWidth={2}
    {...props}
  >
    <Path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const LessonEyeIcon = (props: SvgProps) => (
  <Svg
    width={props.width || 20}
    height={props.height || 20}
    viewBox="0 0 24 24"
    fill="none"
    stroke={props.color || "#6366F1"}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <Circle cx="12" cy="12" r="3" />
  </Svg>
);

export const LessonEditIcon = (props: SvgProps) => (
  <Svg
    width={props.width || 20}
    height={props.height || 20}
    viewBox="0 0 24 24"
    fill="none"
    stroke={props.color || "#D97706"}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <Path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </Svg>
);

export const LessonTrashIcon = (props: SvgProps) => (
  <Svg
    width={props.width || 20}
    height={props.height || 20}
    viewBox="0 0 24 24"
    fill="none"
    stroke={props.color || "#DC2626"}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Polyline points="3 6 5 6 21 6" />
    <Path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <Line x1="10" y1="11" x2="10" y2="17" />
    <Line x1="14" y1="11" x2="14" y2="17" />
  </Svg>
);
