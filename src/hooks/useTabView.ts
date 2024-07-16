import React from 'react';
import { useWindowDimensions } from 'react-native';

const useTabView = ({ dataRoutes }: { dataRoutes: { key: string; title: string }[] }) => {
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);

    const [routes] = React.useState(dataRoutes);
    return { layout, index, routes, setIndex };
};

export default useTabView;
