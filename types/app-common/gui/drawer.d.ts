/// <reference types="react" />
import React from 'react';
import { InferableComponentEnhancerWithProps } from 'react-redux';
export declare const providerConnector: InferableComponentEnhancerWithProps<Drawer.IState & Drawer.IDispatch, {}>;
export declare const reducer: App.IReducer<Drawer.IState>;
export declare const DrawerLayout: React.ComponentClass<Pick<Drawer.IProps, "menu" | "windowSize" | "rnWidth" | "rnHeight" | "content" | "query" | "refForAnimation" | "debugSetWindowSize">> & {
    WrappedComponent: React.ComponentType<Drawer.IProps>;
};
