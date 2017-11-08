/// <reference types="react" />
import React from 'react';
export declare const registerFile: (fileId: Loc.TFileIds, path: string) => void;
export declare const Provider: React.ComponentClass<Pick<Loc.IState, never>> & {
    WrappedComponent: React.ComponentType<Loc.IState>;
};
export declare const reducer: App.IReducer<Loc.IState>;
export declare const loc: (ctx: Loc.IContext, file: Loc.TFileIds) => {
    s: (sentId: number, enSource: string) => string;
    ss: (sentId: number, enSources: string[], mask: (pars: string[]) => React.ReactNode[]) => JSX.Element | React.ReactNode[];
    cl: <T extends any>(event: (event: React.MouseEvent<T>) => void) => (ev: React.MouseEvent<T>) => void;
};
export declare const contextType: <T extends {}>(comp: React.ComponentType<T>) => React.ComponentType<T>;
export declare const locWrapper: (props: Loc.ILocSentenceProps, isSS: boolean) => JSX.Element;
export declare const s: (par: Loc.ILocSentenceProps) => string;
export declare const ss: (par: Loc.ILocSentenceProps) => JSX.Element | React.ReactNode[];
export declare const cl: <T extends any>(ctx: Loc.IContext, event: (event: React.MouseEvent<T>) => void) => (ev: React.MouseEvent<T>) => void;
