export declare class Optional<T> {
    private static EMPTY;
    private value;
    constructor(value?: T);
    static empty<T>(): Optional<T>;
    static of<T>(value: T): Optional<T>;
    static ofNullable<T>(value: T): typeof Optional.empty | Optional<T>;
    get(): T;
    isPresent(): boolean;
    ifPresent(consumer: () => T): any;
}
