import { NavigationContainerRef } from '@react-navigation/native';
import { CommonActions, StackActions } from '@react-navigation/routers';
import React from 'react';

const navigationRef = React.createRef<NavigationContainerRef<any>>();
const routeNameRef: React.MutableRefObject<any | null> = React.createRef();

function navigate(name: string, params?: any) {
    navigationRef.current?.navigate(name, params);
}

function popToTop() {
    navigationRef.current?.dispatch(StackActions.popToTop());
}

function pop(set: number) {
    navigationRef.current?.dispatch(StackActions.pop(set));
}

function back() {
    navigationRef.current?.dispatch(CommonActions.goBack());
}

function replace(name: string, params?: any) {
    navigationRef.current?.dispatch(StackActions.replace(name, params));
}

function reset(name: string, params?: any) {
    navigationRef.current?.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [{ name, params }]
        })
    );
}

export default {
    navigationRef,
    routeNameRef,
    navigate,
    back,
    replace,
    reset,
    popToTop,
    pop
};
