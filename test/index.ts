import Container, {inject,singleton} from '../src/index';

class SimpleClass {
    public member = "test";
}

abstract class Config {
    abstract simple:SimpleClass;
    abstract get();
}

class ConfigImpl extends Config{

    @inject
    public simple:SimpleClass;

    constructor(){
        console.info("call constructor");
        super();
    }

    public get(){
        console.info("get method");
    }
}


export class Service {

    @inject
    public config:Config;

    sendMessage(){
        console.info("Service:send");
    }
}

@singleton
class DevService  extends Service{
    constructor(){
        console.info("singleton constructor");
        super();
    }
    public sendMessage(){
        console.info("send msg:")
    }
}


class ProdService extends Service{

}


@inject(Config)
class MyDependency1 {
    constructor(config){
        console.info("constructor MyDependency1",config)
    }

}

@inject(SimpleClass)
class MyDependency2 {
    constructor(simple){
        console.info("constructor MyDependency2",simple)
    }
}

@inject(MyDependency1,MyDependency2)
export class HasDependencies {

    @inject
    service:Service;

    @inject
    config:Service;

    constructor(myDep1,myDep2){
        this.service.sendMessage();
        console.info(myDep1,myDep2);
    }
}


export class Test{
    @inject
    service:Service;
}


Container.bind(Service,DevService);
Container.bind(Config,ConfigImpl,{singleton:true});

console.log( "\n------------------ test.ts\n\n");

const instance:HasDependencies = Container.getInstanceOf(HasDependencies);
instance.service.sendMessage();
const test = Container.getInstanceOf(Test);
const service = Container.getInstanceOf(Service);
console.info(service);
console.info("\ninstance= ",instance);
console.info("\ntest= ",test);