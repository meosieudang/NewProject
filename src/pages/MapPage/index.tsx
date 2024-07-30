import { locationAddress } from '@/assets';
import { Box, Container, Text, TouchableOpacity } from '@/atoms';
import Header from '@/components/Header';
import theme from '@/themes/light';
import { RouteProp, useRoute } from '@react-navigation/native';
import {
    Callout,
    Camera,
    CircleLayer,
    Images,
    Location,
    LocationPuck,
    MapState,
    MapView,
    PointAnnotation,
    setAccessToken,
    ShapeSource,
    SymbolLayer,
    UserLocation
} from '@rnmapbox/maps';
import { ShapeAnimatorInterface } from '@rnmapbox/maps/lib/typescript/src/shapeAnimators';
import { OnPressEvent } from '@rnmapbox/maps/lib/typescript/src/types/OnPressEvent';
import { Navigation } from 'lucide-react-native';
import React, { MemoExoticComponent, useCallback, useEffect, useRef, useState } from 'react';
import { PermissionsAndroid, Platform, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomSheetMap, { Handle } from './BottomSheetMap';
const a = require('./earthquakes.json');

setAccessToken('sk.eyJ1IjoidGh1YW5teXNwYSIsImEiOiJjbHl3cHpjYmQxcHh4Mm1xbGxvY292a3BrIn0.keOfBdJYKtydFnihgAzdIQ');

type ParamList = {
    Data: {
        data: any[];
    };
};
const MapPage = () => {
    const { params } = useRoute<RouteProp<ParamList, 'Data'>>();
    const geoJson: GeoJSON.GeometryCollection | GeoJSON.Feature | GeoJSON.FeatureCollection | GeoJSON.Geometry | ShapeAnimatorInterface = {
        type: 'FeatureCollection',
        // crs: {
        //     type: 'name',
        //     properties: {
        //         name: 'urn:ogc:def:crs:OGC:1.3:CRS84'
        //     }
        // },
        features: _.map(params.data, (item) => ({
            type: 'Feature',
            properties: {
                id: item.id,
                address: item.address,
                image: item.image,
                shopName: item.shopName,
                time: item.time
            },
            geometry: {
                type: 'Point',
                coordinates: item.coordinates
            }
        }))
    };

    // console.log(JSON.stringify(geoJson, null, 2));
    const shapeSourceRef = useRef<ShapeSource>(null);
    const cameraRef = useRef<Camera>(null);
    const bottomSheetRef = useRef<Handle>(null);
    const insets = useSafeAreaInsets();
    const [selectedFeature, setSelectedFeature] = useState<GeoJSON.Feature<GeoJSON.Point>>();
    const [userLocation, setUserLocation] = useState<Location | null>(null);

    // Request location permissions
    const requestLocationPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                    title: 'Location Permission',
                    message: 'This app needs access to your location to show your position on the map.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK'
                });
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('You can use the location');
                } else {
                    console.log('Location permission denied');
                }
            } catch (err) {
                console.warn(err);
            }
        }
    };

    useEffect(() => {
        requestLocationPermission();
    }, []);

    const handlePress = async (event: OnPressEvent) => {
        // console.log(JSON.stringify(event));
        const feature = event.features[0];
        if (!feature.properties) return;
        if (feature.properties.cluster) {
            // Cluster press, zoom in
            const shapeSource = shapeSourceRef.current;
            const camera = cameraRef.current;

            if (shapeSource && camera) {
                try {
                    const zoomData = await shapeSource.getClusterExpansionZoom(feature);
                    camera.setCamera({
                        //@ts-ignore
                        centerCoordinate: feature.geometry.coordinates,
                        zoomLevel: zoomData,
                        animationMode: 'flyTo',
                        animationDuration: 700
                    });
                } catch (error) {
                    console.log(error, 're');
                }
            }
        } else {
            // Single point press
            console.log('single press', feature.properties);
            //@ts-ignore
            setSelectedFeature(feature);
            cameraRef.current?.setCamera({
                //@ts-ignore
                centerCoordinate: feature.geometry.coordinates,
                animationMode: 'flyTo',
                animationDuration: 700
            });
            bottomSheetRef.current?.showDetail({ item: feature.properties });
            //   Alert.alert('Point Pressed', `ID: ${feature.properties.id}\nTitle: ${feature.properties.title}`);
        }
    };

    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     // Simulate a delay for loading the map
    //     setTimeout(() => setLoading(false), 400);
    // }, []);

    const onCameraChanged = useCallback((state: MapState) => {
        if (state.gestures.isGestureActive) {
            bottomSheetRef.current?.hideDetail();
            setSelectedFeature(undefined);
        }
    }, []);

    const onUserLocationUpdate = useCallback((feature: Location) => {
        if (feature) {
            setUserLocation(feature);
        }
    }, []);

    const onPress = () => {
        if (userLocation) {
            cameraRef.current?.setCamera({
                centerCoordinate: [userLocation.coords.longitude, userLocation.coords.latitude],
                zoomLevel: 14,
                animationMode: 'flyTo',
                animationDuration: 700
            });
        }
    };

    return (
        <Container px={'space-16'}>
            {loading ? (
                <Box style={StyleSheet.absoluteFill}>
                    <Text>loading</Text>
                </Box>
            ) : (
                <>
                    <MapView
                        onCameraChanged={onCameraChanged}
                        onMapIdle={(e) => {
                            // console.log(e, 'onmapidle');
                        }}
                        onWillStartLoadingMap={() => console.log('onWillStartLoadingMap')}
                        onDidFinishLoadingMap={() => console.log('onDidFinishLoadingMap')}
                        onDidFinishRenderingMapFully={() => console.log('onDidFinishRenderingMapFully')}
                        onDidFinishRenderingFrame={() => console.log('onDidFinishRenderingFrame')}
                        scaleBarEnabled={false}
                        projection="globe"
                        style={StyleSheet.absoluteFill}
                        onPress={(e) => console.log(e)}
                        // onUserLocationUpdate={onUserLocationUpdate}
                    >
                        <UserLocation onUpdate={onUserLocationUpdate} />
                        <LocationPuck puckBearingEnabled puckBearing="heading" />
                        <Camera defaultSettings={{ centerCoordinate: [108.2772, 14.0583] }} ref={cameraRef} zoomLevel={5} />
                        <ShapeSource
                            ref={shapeSourceRef}
                            onPress={handlePress}
                            id="earthquakes"
                            cluster
                            clusterRadius={50}
                            // url="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
                            shape={geoJson}
                        >
                            <SymbolLayer
                                id="symbolLocationSymbols"
                                minZoomLevel={1}
                                filter={['!', ['has', 'point_count']]}
                                style={layerStyles.singlePoint}
                            />
                            <Images images={{ check: locationAddress }} />
                            <SymbolLayer id="pointCount" style={layerStyles.clusterCount} />
                            <CircleLayer
                                id="clusteredPoints"
                                belowLayerID="pointCount"
                                filter={['has', 'point_count']}
                                style={layerStyles.clusteredPoints}
                            />
                        </ShapeSource>

                        {selectedFeature && (
                            <PointAnnotation
                                onSelected={(e) => console.log(e)}
                                anchor={{ x: 0.5, y: 2 }}
                                id="annotation"
                                coordinate={selectedFeature?.geometry?.coordinates}
                            >
                                <Box bg={'background.default'} p={'space-8'} borderRadius={'border-radius-8'}>
                                    <Text>{selectedFeature?.properties?.shopName}</Text>
                                    <Text>{selectedFeature?.properties?.address}</Text>
                                </Box>
                                <Callout title="">
                                    <Text>{''}</Text>
                                </Callout>
                            </PointAnnotation>
                        )}
                    </MapView>
                </>
            )}

            <Header title="Danh sách điểm bán" />
            <TouchableOpacity
                bg={'background.default'}
                width={48}
                height={48}
                borderRadius={'border-radius-8'}
                justifyContent={'center'}
                alignItems={'center'}
                alignSelf={'flex-end'}
                mt={'space-16'}
                onPress={onPress}
            >
                <Navigation fill={theme.colors['text.default']} />
            </TouchableOpacity>
            <BottomSheetMap ref={bottomSheetRef} data={params.data} />

            {/* <StatusBar translucent backgroundColor={'transparent'} /> */}
        </Container>
    );
};

export default MapPage;

const layerStyles = {
    singlePoint: {
        iconImage: 'check',
        iconAllowOverlap: true,
        iconSize: 0.1,
        iconAnchor: 'bottom'
    },
    clusteredPoints: {
        circlePitchAlignment: 'map',
        circleColor: 'green',
        circleRadius: 20,
        circleOpacity: 0.7,
        circleStrokeWidth: 2,
        circleStrokeColor: 'white'
    },
    clusterCount: {
        textField: '{point_count}',
        textSize: 16,
        textColor: '#ffffff',
        textPitchAlignment: 'map'
    }
};
