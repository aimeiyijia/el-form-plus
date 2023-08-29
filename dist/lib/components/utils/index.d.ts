export declare function isString(obj: any): boolean;
export declare function isObject(obj: any): boolean;
export declare function isArray(val: any): boolean;
export declare function isMultiDimension(val: any): Boolean;
export declare function isBoolean(val: any): boolean;
export declare function isHtmlElement(node: any): boolean;
/**
 *  - Inspired:
 *    https://github.com/jashkenas/underscore/blob/master/modules/isFunction.js
 */
declare let isFunction: (functionToCheck: any) => any;
export { isFunction };
export declare const isUndefined: (val: any) => boolean;
export declare const isDefined: (val: any) => boolean;
export declare const isEmpty: (val: any) => boolean;
export declare const kebabCase: (str: string) => string;
export declare const capitalize: (str: string) => string;
export declare function deepQuery(tree: any, value: string, matchMark?: string, children?: string): null;
export declare function deepMerge(target?: any, source?: any): any;
