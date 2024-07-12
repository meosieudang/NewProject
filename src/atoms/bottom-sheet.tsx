// import { Theme } from '@/themes';
// import RNBottomSheet, { BottomSheetProps } from '@gorhom/bottom-sheet';
// import { ColorProps, useTheme } from '@shopify/restyle';
// import React, { forwardRef } from 'react';

// type Props = BottomSheetProps & ColorProps<Theme>;

// const BottomSheet = forwardRef<RNBottomSheet, Props>(({ ...rest }, ref) => {
//     const theme = useTheme<Theme>();
//     const bgColor = theme.colors['background.paper'];
//     const handleColor = theme.colors['grey.900'];

//     return (
//         <RNBottomSheet
//             {...rest}
//             ref={ref}
//             handleIndicatorStyle={{
//                 backgroundColor: handleColor,
//                 opacity: 0.8
//             }}
//             backgroundStyle={{
//                 backgroundColor: bgColor
//             }}
//         />
//     );
// });

// export default BottomSheet;
