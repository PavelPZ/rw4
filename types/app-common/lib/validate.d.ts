/// <reference types="react" />
import React from 'react';
export declare class editor<T> extends React.PureComponent<Validate.IProps<T>, Validate.IState<T>> {
    constructor(props: any);
    convertors: {
        [prop: string]: Validate.IConvertors;
    };
    validateProp(propId: keyof T): boolean;
    validate(): boolean;
    onSubmit(): void;
}
export declare const numberConvertors: Validate.IConvertors<number>;
export declare const trimConvertors: Validate.IConvertors<string>;
export declare const defaultConvertors: Validate.IConvertors<any>;
export declare const requiredValidator: Validate.IValidatorFactory;
export declare const intValidator: Validate.IValidatorFactory;
export declare const rangeValidator: Validate.IValidatorFactory;
