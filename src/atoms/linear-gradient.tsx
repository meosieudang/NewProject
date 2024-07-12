// import { Theme, useTheme } from '@/themes';
// import { BoxProps } from '@shopify/restyle';
// import React, { FC, useMemo } from 'react';
// import { StyleProp, ViewStyle } from 'react-native';
// import L, { LinearGradientProps } from 'react-native-linear-gradient';
// import Box from './box';

// const LinearGradient: FC<
//     BoxProps<Theme> & {
//         colors?: (keyof Theme['colors'])[];
//         LinearProps?: Omit<LinearGradientProps, 'colors'>;
//         borderRadius?: keyof Theme['borderRadii'];
//         borderTL?: keyof Theme['borderRadii'];
//         borderTR?: keyof Theme['borderRadii'];
//         borderBL?: keyof Theme['borderRadii'];
//         borderBR?: keyof Theme['borderRadii'];
//         LinearStyle?: Omit<BoxProps<Theme>, 'borderRadius'> & StyleProp<ViewStyle>;
//     }
// > = ({
//     colors = ['gradient.1', 'gradient.2'],
//     children,
//     borderRadius = 'xs',
//     borderBL,
//     borderBR,
//     borderTL,
//     borderTR,
//     LinearProps,
//     LinearStyle,
//     ...rest
// }) => {
//     const theme = useTheme();
//     const rColors: (string | number)[] = useMemo(() => _.map(colors, (c) => theme.colors[c]), [colors]);
//     const borderRadiusValue = borderRadius && theme.borderRadii[borderRadius];
//     const borderTLValue = borderTL && theme.borderRadii[borderTL];
//     const borderTRValue = borderTR && theme.borderRadii[borderTR];
//     const borderBLValue = borderBL && theme.borderRadii[borderBL];
//     const borderBRValue = borderBR && theme.borderRadii[borderBR];

//     return (
//         <L
//             useAngle
//             angle={150}
//             angleCenter={{ x: 0.9, y: 0.6 }}
//             colors={rColors}
//             style={[
//                 {
//                     borderRadius: borderRadiusValue,
//                     borderTopLeftRadius: borderTLValue,
//                     borderTopRightRadius: borderTRValue,
//                     borderBottomLeftRadius: borderBLValue,
//                     borderBottomRightRadius: borderBRValue
//                 },
//                 LinearStyle
//             ]}
//             {...LinearProps}
//         >
//             <Box {...rest}>{children}</Box>
//         </L>
//     );
// };

// export default LinearGradient;
