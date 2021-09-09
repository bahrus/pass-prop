import {PassDown} from 'pass-down/pass-down.js';
import {def} from 'trans-render/lib/def.js';
export class PassProp extends PassDown{
    static is = 'pass-prop';
    attach(elementToObserve: Element, {on, handleEvent}: this){
        let prop = Object.getOwnPropertyDescriptor(elementToObserve, on!);
        if(prop === undefined){
            prop = Object.getOwnPropertyDescriptor(elementToObserve.constructor.prototype, on!)!;
        }
        const setter = prop.set!.bind(elementToObserve);
        const getter = prop.get!.bind(elementToObserve);
        Object.defineProperty(elementToObserve, on!, {
            get(){
                return getter();
            },
            set(nv){
                setter(nv);
                const event = {
                    target: this
                };
                handleEvent(event as Event);
            },
            enumerable: true,
            configurable: true,
        });        
    }
}

def(PassProp);