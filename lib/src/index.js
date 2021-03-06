"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bindings = new Map();
var singletons = new Map();
var DEPENDENCIES = Symbol('DEPENDENCIES');
var INJECT = Symbol('INJECT');
require("reflect-metadata");
function inject() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var target = args[0];
    var key = args[1];
    if (typeof target == 'object') {
        var Interface = Reflect.getMetadata("design:type", target, key);
        Container.registerDependency(target.constructor, key, Interface);
    }
    else {
        var args_1 = arguments;
        return function (clazz, name) {
            Container.registerDependencies.apply(Container, [clazz].concat(Array.prototype.slice.call(args_1)));
        };
    }
}
exports.inject = inject;
function singleton(Clazz) {
    Container.registerAsSingleton(Clazz);
}
exports.singleton = singleton;
var Container = (function () {
    function Container() {
    }
    Container.bind = function (iClass, Class, options) {
        Object.setPrototypeOf(Class, iClass);
        bindings.set(iClass, Class);
        if (options && options.singleton) {
            this.registerAsSingleton(Class);
        }
    };
    Container.getInstanceOf = function (clazz) {
        if (bindings.has(clazz)) {
            clazz = bindings.get(clazz);
        }
        return this.resolve(clazz);
    };
    Container.registerAsSingleton = function (clazz) {
        if (!singletons.has(clazz)) {
            singletons.set(clazz, null);
        }
    };
    Container.registerDependencies = function (clazz) {
        var dependencies = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            dependencies[_i - 1] = arguments[_i];
        }
        clazz[DEPENDENCIES] = dependencies;
    };
    Container.registerDependency = function (clazz, key, Interface) {
        var inject = clazz[INJECT];
        if (!inject) {
            inject = clazz[INJECT] = {};
        }
        inject[key] = Interface;
    };
    Container.resolveInstance = function (clazz) {
        if (typeof clazz != "function")
            throw new Error(clazz + " must be class not a " + typeof clazz);
        var classes = clazz[DEPENDENCIES] || [];
        var dependencies = classes.map(this.getInstanceOf.bind(this));
        return this.inject(clazz, dependencies);
    };
    Container.resolveSingleton = function (clazz) {
        if (singletons.get(clazz) === null) {
            singletons.set(clazz, this.resolveInstance(clazz));
        }
        return singletons.get(clazz);
    };
    Container.resolve = function (clazz) {
        if (singletons.has(clazz)) {
            return this.resolveSingleton(clazz);
        }
        return this.resolveInstance(clazz);
    };
    Container.inject = function (clazz, dependencies) {
        var _this = this;
        var injectors = clazz[INJECT] || {};
        var instance = Object.create(null);
        Object.keys(injectors)
            .forEach(function (key) {
            instance[key] = _this.getInstanceOf(injectors[key]);
        });
        Object.setPrototypeOf(instance, clazz.prototype);
        clazz.apply(instance, dependencies);
        return instance;
    };
    return Container;
}());
exports.default = Container;
//# sourceMappingURL=index.js.map