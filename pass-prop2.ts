import {PassDown} from 'pass-down/pass-down.js';

export class PassProp extends PassDown{
    attach(elementToObserve: Element, {on, handleEvent}: this){
        const ctor = Object.getPrototypeOf(elementToObserve.constructor);
        const prop = Object.getOwnPropertyDescriptor(ctor.prototype, on);
        const setter = prop.set;
        const getter = prop.get;
        Object.defineProperty(elementToObserve, on, {
            get(){
                getter.bind(this);
                return getter()
            },
            set(nv){
                setter.bind(this);
                setter(nv);
                const event = {
                    target: this
                };
                handleEvent(event as Event);
            },
            enumerable: true,
            configurable: true,
        })        
    }
}