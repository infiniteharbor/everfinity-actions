import "reflect-metadata";
export declare function inject(...args: any[]): any;
export declare function singleton(Clazz: any): void;
export default class Container {
    static bind(iClass: Function, Class: Function, options?: any): void;
    static getInstanceOf(clazz: any): any;
    static registerAsSingleton(clazz: any): void;
    static registerDependencies(clazz: any, ...dependencies: any[]): void;
    static registerDependency(clazz: Function, key: string, Interface: Function): void;
    private static resolveInstance;
    private static resolveSingleton;
    private static resolve;
    private static inject;
}
