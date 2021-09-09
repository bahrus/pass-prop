import { PassDown } from 'pass-down/pass-down.js';
import { def } from 'trans-render/lib/def.js';
export class PassProp extends PassDown {
    static is = 'pass-prop';
    attach(elementToObserve, { on, handleEvent }) {
        const prop = Object.getOwnPropertyDescriptor(elementToObserve.constructor.prototype, on);
        const setter = prop.set;
        const getter = prop.get;
        Object.defineProperty(elementToObserve, on, {
            get() {
                getter.bind(this);
                return getter();
            },
            set(nv) {
                setter.bind(this);
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
