declare class SimpleClass {
    member: string;
}
declare abstract class Config {
    abstract simple: SimpleClass;
    abstract get(): any;
}
export declare class Service {
    config: Config;
    sendMessage(): void;
}
export declare class HasDependencies {
    service: Service;
    config: Service;
    constructor(myDep1: any, myDep2: any);
}
export declare class Test {
    service: Service;
}
export {};
