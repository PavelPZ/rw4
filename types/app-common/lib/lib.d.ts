/// <reference types="react" />
import React from 'react';
export declare const getAppId: (domains: App.InstancePars<string>) => "localhost" | "test";
export declare const promiseAll: (promises: any[]) => Promise<any[]>;
export declare const isPromise: (obj: any) => boolean;
export declare const storeContextType: <T extends {}>(comp: React.ComponentType<T>) => React.ComponentType<T>;
export declare class WaitForRendering extends React.PureComponent<{
    waitFor?: Promise<any> | PromiseExtensible;
    finalContent?: Promise<JSX.Element>;
    waitContent: JSX.Element;
}> {
    state: {
        finalContent: any;
    };
    render(): any;
}
export declare const shallowEqual: (objA: any, objB: any) => boolean;
export declare class PromiseExtensible<T = void> implements IPromiseExtensible<T> {
    constructor(executor?: (resolve: (value?: T | PromiseLike<T> | PromiseResults) => void, reject: (reason?: any) => void) => void);
    finished(res: T | PromiseLike<T> | PromiseResults): void;
    _promise: Promise<any>;
    _state: PromiseStates;
    _started: boolean;
    start(): PromiseExtensible<T | PromiseResults>;
    doStart(): void;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T | PromiseResults) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): PromiseExtensible<TResult1 | TResult2 | PromiseResults>;
    catch(msg: any): this;
    resolve: (res?: T | PromiseLike<T> | PromiseResults, state?: PromiseStates) => void;
    reject: (reason?: any) => void;
    abortHandler: () => void;
    onAbort(handler: () => void): PromiseExtensible<T | PromiseResults>;
    abort(msg?: any): PromiseExtensible<T | PromiseResults>;
    timeout(time: number, func?: () => void): PromiseExtensible<T | PromiseResults>;
    _timer: number;
    static delay(msec: number): Promise<void>;
}
