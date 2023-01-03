interface IOption {
    includeInheritedProps?: boolean;
}
interface IObject {
    [key: string]: any;
}
declare class ObjectPath {
    options: IOption;
    hasShallowProperty: Function;
    constructor(options: IOption);
    createShallowPropertyFunc(): Function;
    getShallowProperty(obj: IObject, prop: string): any;
    set(obj: IObject, path: any, value: any, doNotReplace?: boolean): any;
    has(obj: IObject, path: any): boolean;
    ensureExistsn(obj: object, path: any, value: any): any;
    insert(obj: object, path: any, value: any, at: any): void;
    empty(obj: object, path: any): any;
    push(obj: object, path: any): void;
    coalesce(obj: object, paths: any, defaultValue: any): any;
    get(obj: IObject, path: any, defaultValue?: any): any;
    del(obj: IObject, path: any): any;
}
declare const mod: ObjectPath;
export default mod;
