const bindings = new Map();
const singletons = new Map();
const DEPENDENCIES = Symbol('DEPENDENCIES');
const INJECT = Symbol('INJECT');
import "reflect-metadata";

export function inject(...args):any {
    let target = args[0];
    let key = args[1];
    if( typeof target =='object' ){
        let Interface:Function = Reflect.getMetadata("design:type", target, <string>key);
        Container.registerDependency(target.constructor,key,Interface);
    }else{
        let args = arguments;
        return (clazz,name) =>{
            Container.registerDependencies.apply(Container, [clazz].concat(Array.prototype.slice.call(args)));
        }
    }
}

export function singleton(Clazz) {
  Container.registerAsSingleton(Clazz);
}

export default class Container {

  public static bind(iClass: Function, Class: Function, options?) {
    Object.setPrototypeOf(Class, iClass);
    bindings.set(iClass, Class);
    if (options && options.singleton) {
      this.registerAsSingleton(Class);
    }
  }
  public static getInstanceOf(clazz): any {
    if (bindings.has(clazz)) {
      clazz = bindings.get(clazz);
    }
    return this.resolve(clazz);
  }

  public static registerAsSingleton(clazz) {
    if (!singletons.has(clazz)) {
      singletons.set(clazz, null);
    }
  }

  public static registerDependencies(clazz, ...dependencies) {
    clazz[DEPENDENCIES] = dependencies
  }

  public static registerDependency(clazz: Function, key: string, Interface: Function) {
    let inject = clazz[INJECT];
    if (!inject) {
      inject = clazz[INJECT] = {};
    }
    inject[key] = Interface;
  }

  private static resolveInstance(clazz) {
    if (typeof clazz != "function") throw new Error(`${clazz} must be class not a ${typeof clazz}`);
    let classes = clazz[DEPENDENCIES] || [];
    let dependencies = classes.map(this.getInstanceOf.bind(this));
    return this.inject(clazz, dependencies);
  }

  private static resolveSingleton(clazz) {
    if (singletons.get(clazz) === null) {
      singletons.set(clazz, this.resolveInstance(clazz));
    }
    return singletons.get(clazz);
  }
  
  private static resolve(clazz) {
    if (singletons.has(clazz)) {
      return this.resolveSingleton(clazz);
    }
    return this.resolveInstance(clazz);
  }

  private static inject(clazz, dependencies: Array<any>) {
    let injectors = clazz[INJECT] || {};
    let instance = Object.create(null);
    Object.keys(injectors)
      .forEach(key => {
        instance[key] = this.getInstanceOf(injectors[key]);
      });
    Object.setPrototypeOf(instance, clazz.prototype);
    clazz.apply(instance, dependencies);
    return instance;
  }
}