import { PassDown } from 'pass-down/pass-down.js';
import { def } from 'trans-render/lib/def.js';
export class PassProp extends PassDown {
    static is = 'pass-prop';
    onFromProp(initVal) {
        return initVal;
    }
    attach(elementToObserve, { on, handleEvent }) {
        let proto = elementToObserve;
        let prop = Object.getOwnPropertyDescriptor(proto, on);
        while (proto && !prop) {
            proto = Object.getPrototypeOf(proto);
            prop = Object.getOwnPropertyDescriptor(proto, on);
        }
        //let prop = Object.getOwnPropertyDescriptor(elementToObserve, on!);
        if (prop === undefined) {
            throw { elementToObserve, on, message: "Can't find property." };
        }
        const setter = prop.set.bind(elementToObserve);
        const getter = prop.get.bind(elementToObserve);
        Object.defineProperty(elementToObserve, on, {
            get() {
                return getter();
            },
            set(nv) {
                setter(nv);
                const event = {
                    target: this
                };
                handleEvent(event);
            },
            enumerable: true,
            configurable: true,
        });
    }
}
def(PassProp);
